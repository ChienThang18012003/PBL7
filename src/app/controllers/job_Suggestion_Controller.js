const Job_Post = require("../models/Job_Post");
const Company = require('../models/Company');
const Resume = require('../models/Resume');
const Resume_Applied = require('../models/Resume_Applied');
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
const fs = require("fs");
const User1 = require("../models/User1");
require("dotenv").config();
const express = require('express');
const router = express.Router();
const User_Search_Preference = require('../models/User_Search_Preference');
const { OpenAI } = require('openai');
const { createSimpleJobSuggestionPrompt } = require('../utils/generatePrompt');
const { buildPrompt } = require('../utils/buildPrompt');
const intentConfig = require('../utils/intents.json');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const fetch = require('node-fetch'); // Đảm bảo bạn đã cài đặt node-fetch

class job_Suggestion_Controller {

    tutorialGuide = {
        "Cách tạo hồ sơ": "Để tạo hồ sơ, vào trang Hồ sơ cá nhân và nhấn nút 'Tạo hồ sơ mới', sau đó điền đầy đủ thông tin và lưu lại.",
        "Cách tạo phản hồi": "Bạn có thể gửi phản hồi bằng cách vào mục 'Liên hệ' hoặc 'Góp ý' trong phần Cài đặt.",
        "Cách xem danh sách việc làm đã ứng tuyển": "Truy cập mục 'Ứng tuyển của tôi' trong trang cá nhân để xem các công việc đã ứng tuyển.",
        "Cách xem danh sách việc làm đã lưu": "Bạn có thể xem các việc làm đã lưu trong mục 'Việc làm đã lưu' trên trang cá nhân.",
        "Cách xem danh sách công ty đã theo dõi": "Để xem danh sách công ty bạn đang theo dõi, vào phần 'Công ty đã theo dõi' trong mục yêu thích của bạn."
    };


    suggest_Job_Post = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User1.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const histories = await User_Search_Preference.find({ user_id: user._id })
                .sort({ created_at: -1 })
                .limit(5)
                .populate('city_id career_id');


            if (!histories.length) {
                return res.status(200).json({ suggestions: [] });
            }


            const cityIds = histories.map(h => h.city_id?._id?.toString()).filter(Boolean);
            const careerIds = histories.map(h => h.career_id?._id?.toString()).filter(Boolean);

            const jobs = await Job_Post.find({
                is_deleted: false,
                status: 'Đã duyệt',
                deadline: { $gte: new Date() }
            })
            .populate({
                path: 'location_id',
                populate: { path: 'city_id', select: 'name' }
            })
            .populate('career_id', 'career_name')
            .populate('company_id', 'company_name company_email company_phone cover_image logo')
            .limit(50);

            let filteredJobs = [];

            if (!cityIds.length && !careerIds.length) {
                filteredJobs = jobs
            } else {
                filteredJobs = (jobs || []).filter(job => {
                    const jobCityId = job.location_id?.city_id?._id?.toString();
                    const jobCareerId = job.career_id?._id?.toString();
                    return cityIds.includes(jobCityId) || careerIds.includes(jobCareerId);
                });
            }

            if (!filteredJobs.length) {
                return res.json({ suggestions: [] });
            }

            const prompt = createSimpleJobSuggestionPrompt(histories, filteredJobs);

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'your-app-title', 
                },
                body: JSON.stringify({
                    model: 'mistralai/mistral-7b-instruct', 
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.2,
                }),
            });

            const data = await response.json();

            if (!data.choices || !data.choices[0]?.message?.content) {
                console.error('Phản hồi từ OpenRouter không hợp lệ:', data);
                return res.status(500).json({ message: 'Lỗi từ OpenRouter API' });
            }

            const raw = data.choices[0].message.content;

            let suggestions;
            try {
                suggestions = JSON.parse(raw);
            } catch (parseError) {
                console.error('Lỗi phân tích JSON từ phản hồi OpenRouter:', parseError);
                return res.status(500).json({ message: 'Lỗi phân tích phản hồi từ OpenRouter' });
            }
            
            const suggestedJobs = suggestions.map(index => jobs[index]).filter(Boolean);

            return res.json({ suggestions: suggestedJobs });
        } catch (error) {
            console.error('Lỗi gợi ý công việc:', error);
            return res.status(500).json({ message: 'Lỗi server khi gợi ý việc làm' });
        }
    };

    handleIntent = async (intent, params) => {
      try {
        const limit = parseInt(params.quantity) || 5;
    
        switch (intent) {
          case "find_job": {
            const baseQuery = {
                is_deleted: false,
                status: "Đã duyệt",
                deadline: { $gte: new Date() }
            };

            if (!params.city && !params.career && !params.job_type && !params.experience && !params.salary) {
                return {
                reply: "Vui lòng cung cấp ít nhất một tiêu chí như địa điểm, ngành nghề, hình thức làm việc, kinh nghiệm hoặc mức lương để tôi có thể giúp bạn tìm việc làm phù hợp.",
                results: [],
                intent: intent
                };
            }
    
            // Bước 1: Truy vấn ban đầu + populate để lọc theo city, career
            let jobs = await Job_Post.find(baseQuery)
                .populate({
                path: "location_id",
                populate: { path: "city_id", select: "name" }
                })
                .populate("career_id", "career_name");
    
            // Bước 2: Lọc theo city (nếu có)
            if (params.city) {
                const keyword = params.city.toLowerCase();
                jobs = jobs.filter(job => {
                const cityName = job.location_id?.city_id?.name?.toLowerCase();
                return cityName?.includes(keyword);
                });
            }
    
            // Bước 3: Lọc theo career (nếu có)
            if (params.career) {
                const keyword = params.career.toLowerCase();
                jobs = jobs.filter(job => {
                const careerName = job.career_id?.career_name?.toLowerCase();
                return careerName?.includes(keyword);
                });
            }
    
            // Bước 4: Lọc theo experience (nếu có)
            if (params.experience) {
                const keyword = params.experience.toLowerCase();
                jobs = jobs.filter(job => job.experience?.toLowerCase()?.includes(keyword));
            }
    
            // Bước 5: Lọc theo job_type (nếu có)
            if (params.job_type) {
                const keyword = params.job_type.toLowerCase();
                jobs = jobs.filter(job => job.job_type?.toLowerCase()?.includes(keyword));
            }
    
            // Bước 6: Lọc theo salary (nếu có)
            if (params.salary) {
                const salaryValue = parseInt(params.salary.toString().replace(/\D/g, ""), 10);
                if (!isNaN(salaryValue)) {
                jobs = jobs.filter(job =>
                    typeof job.salary_min === 'number' &&
                    typeof job.salary_max === 'number' &&
                    job.salary_min <= salaryValue &&
                    job.salary_max >= salaryValue
                );
                }
            }
    
            // Bước 7: Cắt kết quả theo quantity
            const limit = parseInt(params.quantity) || 5;
            const limitedJobs = jobs.slice(0, limit);
    
            const result = limitedJobs.map(j => ({ _id: j._id, job_name: j.job_name }));
    
            return {
                reply: `Tìm thấy ${result.length} công việc phù hợp.`,
                results: result,
                intent: intent
            };
        }
    
          case "find_company": {
            const baseQuery = { is_deleted: false };

            if (!params.city && !params.career) {
                return {
                reply: "Vui lòng cung cấp ít nhất một tiêu chí như địa điểm hoặc ngành nghề để tôi có thể giúp bạn tìm công ty phù hợp.",
                results: [],
                intent: intent
                };
            }
    
            // Bước 1: Lấy danh sách công ty có populate location & career
            let companies = await Company.find(baseQuery)
                .populate({
                path: "location_id",
                populate: { path: "city_id", select: "name" }
                })
                .populate("career_id", "career_name");
    
            // Bước 2: Lọc theo city (nếu có)
            if (params.city) {
                const keyword = params.city.toLowerCase();
                companies = companies.filter(company => {
                const cityName = company.location_id?.city_id?.name?.toLowerCase();
                return cityName?.includes(keyword);
                });
            }
    
            // Bước 3: Lọc theo career (nếu có)
            if (params.career) {
                const keyword = params.career.toLowerCase();
                companies = companies.filter(company => {
                const careerName = company.career_id?.career_name?.toLowerCase();
                return careerName?.includes(keyword);
                });
            }
    
            // Bước 4: Giới hạn số lượng
            const limit = parseInt(params.quantity) || 5;
            const limitedCompanies = companies.slice(0, limit);
    
            const result = limitedCompanies.map(c => ({
                _id: c._id,
                company_name: c.company_name
            }));
    
            return {
                reply: `Tìm thấy ${result.length} công ty phù hợp.`,
                results: result,
                intent: intent
            };
        }
    
          case "find_resume": {
            const baseQuery = { is_deleted: false };
            let resumes = [];

            if (!params.email && !params.resume_name) {
                return {
                reply: "Vui lòng cung cấp ít nhất một tiêu chí như email người dùng hoặc tên hồ sơ để tôi có thể hỗ trợ tìm kiếm giúp bạn.",
                results: [],
                intent: intent
                };
            }
    
            // Nếu có email → tìm user rồi resume theo user_id
            if (params.email) {
                const user = await User1.findOne({ email: params.email });
                if (!user) {
                return {
                    reply: "Không tìm thấy người dùng với email đã cung cấp.",
                    results: [],
                };
                }
                baseQuery.user_id = user._id;
                resumes = await Resume.find(baseQuery);
            }
    
            // Nếu không có email nhưng có resume_name → tìm theo desired_position
            else if (params.resume_name) {
                baseQuery.desired_position = {
                $regex: params.resume_name,
                $options: 'i'
                };
                resumes = await Resume.find(baseQuery);
            }
    
            // Nếu có cả resume_name và đã tìm theo user_id thì lọc tiếp
            if (params.email && params.resume_name) {
                const keyword = params.resume_name.toLowerCase();
                resumes = resumes.filter(r =>
                r.desired_position?.toLowerCase()?.includes(keyword)
                );
            }
    
            const limit = parseInt(params.quantity) || 5;
            const limitedResumes = resumes.slice(0, limit);
    
            const result = limitedResumes.map(r => ({
                _id: r._id,
                desired_position: r.desired_position,
            }));
    
            return {
                reply: `Tìm thấy ${result.length} hồ sơ phù hợp.`,
                results: result,
                intent: intent
            };
        }
    
          case "find_applications": {
            // Nếu không có email → yêu cầu người dùng cung cấp
            if (!params.email) {
                return {
                reply: "Vui lòng cung cấp email để tôi có thể tìm các công việc bạn đã ứng tuyển.",
                results: [],
                };
            }

            // Tìm user theo email
            const user = await User1.findOne({ email: params.email });
            if (!user) {
                return {
                reply: "Không tìm thấy người dùng với email đã cung cấp.",
                results: [],
                };
            }

            // Lấy danh sách ứng tuyển theo user_id
            let appliedList = await Resume_Applied.find({ user_id: user._id, is_deleted: false })
                .populate('job_post_id')
                .populate('resume_id');

            // Lọc theo job_name nếu có
            if (params.job_name) {
                const keyword = params.job_name.toLowerCase();
                appliedList = appliedList.filter(app =>
                app.job_post_id?.job_name?.toLowerCase().includes(keyword)
                );
            }

            // Lọc theo resume_name nếu có
            if (params.resume_name) {
                const keyword = params.resume_name.toLowerCase();
                appliedList = appliedList.filter(app =>
                app.resume_id?.desired_position?.toLowerCase().includes(keyword)
                );
            }

            const limit = parseInt(params.quantity) || 5;
            const limited = appliedList.slice(0, limit);

            const result = limited.map(app => ({
                _id: app?.job_post_id?._id,
                job_name: app?.job_post_id?.job_name,
                resume_name: app?.resume_id?.desired_position
            })).filter(x => x._id); // loại bỏ bản ghi lỗi

            return {
                reply: `Tìm thấy ${result.length} công việc đã ứng tuyển.`,
                results: result,
                intent: intent
            };
        }
        case "find_jobs_by_resume": {
            if (!params.resume_name) {
                return {
                    reply: "Vui lòng cung cấp tên hồ sơ (resume_name) để tìm kiếm.",
                    results: [],
                    intent
                };
            }

            const resume = await Resume.findOne({
                desired_position: { $regex: params.resume_name, $options: "i" },
                is_deleted: false
            }).populate("career_id").populate("city_id");

            if (!resume) {
                return {
                    reply: `Không tìm thấy hồ sơ với tên gần đúng ${params.resume_name}.`,
                    results: [],
                    intent
                };
            }

            let jobs = await Job_Post.find({
                is_deleted: false,
                status: "Đã duyệt",
                deadline: { $gte: new Date() }
            }).populate({
                path: "location_id",
                populate: { path: "city_id" }
            });

            const scoredJobs = jobs.map(job => {
                let score = 0;

                if (resume.career_id && String(job.career_id) === String(resume.career_id._id)) score += 10;
                if (resume.city_id && String(job.location_id?.city_id?._id) === String(resume.city_id._id)) score += 8;
                if (resume.job_type && job.job_type?.toLowerCase() === resume.job_type?.toLowerCase()) score += 6;

                if (typeof resume.salary_min === "number" && typeof resume.salary_max === "number" &&
                    job.salary_min <= resume.salary_max && job.salary_max >= resume.salary_min) score += 4;

                if (resume.experience && job.experience?.toLowerCase() === resume.experience?.toLowerCase()) score += 3;
                if (resume.academic_level && job.academic_level?.toLowerCase() === resume.academic_level?.toLowerCase()) score += 2;
                if (resume.type_of_workplace && job.type_of_workplace?.toLowerCase() === resume.type_of_workplace?.toLowerCase()) score += 1;

                return { job, score };
            });

            const topJobs = scoredJobs
                .sort((a, b) => b.score - a.score)
                .slice(0, parseInt(params.quantity) || 5)
                .map(({ job }) => ({ _id: job._id, job_name: job.job_name }));

            return {
                reply: `Tìm thấy ${topJobs.length} việc làm phù hợp với hồ sơ.`,
                results: topJobs,
                intent
            };
        }

        case "find_resumes_by_job": {
            if (!params.job_post_name) {
                return {
                    reply: "Vui lòng cung cấp tên công việc (job_post_name) để tìm kiếm.",
                    results: [],
                    intent
                };
            }

            const job = await Job_Post.findOne({
                job_name: { $regex: params.job_post_name, $options: "i" },
                is_deleted: false,
                status: "Đã duyệt",
                deadline: { $gte: new Date() }
            }).populate({
                path: "location_id",
                populate: { path: "city_id" }
            });

            if (!job) {
                return {
                    reply: `Không tìm thấy công việc phù hợp với tên gần đúng ${params.job_post_name}.`,
                    results: [],
                    intent
                };
            }

            let resumes = await Resume.find({ is_deleted: false })
                .populate("career_id")
                .populate("city_id");

            const scoredResumes = resumes.map(resume => {
                let score = 0;

                if (job.career_id && String(resume.career_id?._id) === String(job.career_id)) score += 10;
                if (job.location_id?.city_id && String(resume.city_id?._id) === String(job.location_id.city_id._id)) score += 8;
                if (job.job_type && resume.job_type?.toLowerCase() === job.job_type?.toLowerCase()) score += 6;

                if (typeof resume.salary_min === "number" && typeof resume.salary_max === "number" &&
                    resume.salary_min <= job.salary_max && resume.salary_max >= job.salary_min) score += 4;

                if (job.experience && resume.experience?.toLowerCase() === job.experience?.toLowerCase()) score += 3;
                if (job.academic_level && resume.academic_level?.toLowerCase() === job.academic_level?.toLowerCase()) score += 2;
                if (job.type_of_workplace && resume.type_of_workplace?.toLowerCase() === job.type_of_workplace?.toLowerCase()) score += 1;

                return { resume, score };
            });

            const topResumes = scoredResumes
                .sort((a, b) => b.score - a.score)
                .slice(0, parseInt(params.quantity) || 5)
                .map(({ resume }) => ({ _id: resume._id, desired_position: resume.desired_position }));

            return {
                reply: `Tìm thấy ${topResumes.length} hồ sơ phù hợp với công việc.`,
                results: topResumes,
                intent
            };
        }

        
          case "tutorial": {
            const type = params.type;
            if (this.tutorialGuide[type]) {
              return { reply: this.tutorialGuide[type], intent: intent };
            } else {
              return { reply: "Tôi chưa có hướng dẫn cho yêu cầu này.", intent: intent };
            }
          }
    
          case "other_question": {
            return { reply: params.answer || "Xin vui lòng cung cấp thêm thông tin.", intent: intent };
          }
    
          default:
            return {
              reply: "Tôi không hiểu câu hỏi của bạn, vui lòng đặt câu hỏi khác.", intent: "unknown",
            };
        }
      } catch (err) {
        console.error("Lỗi xử lý intent:", err);
        return { reply: "Có lỗi xảy ra khi xử lý yêu cầu." };
      }
    };

    extractIntent = async (req, res) => {
        try {
            const {question} = req.body
            const prompt = buildPrompt(question);
    
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000', 
                    'X-Title': 'your-app-title', 
                },
                body: JSON.stringify({
                    model: 'mistralai/mistral-7b-instruct',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.2,
                }),
            });
    
            const result = await response.json();
            let content = result.choices[0]?.message?.content;
            if (!content) throw new Error("Phản hồi từ mô hình trống");

            content = content.trim();

            // Nếu có định dạng ```json ... ``` thì loại bỏ
            if (content.startsWith("```json")) {
                content = content.replace(/^```json\s*/, "").replace(/```$/, "").trim();
            } else if (content.startsWith("```")) {
                content = content.replace(/^```\s*/, "").replace(/```$/, "").trim();
            }
            const parsed = JSON.parse(content);
            const finalResult = await this.handleIntent(parsed?.intent, parsed?.params || {})
            console.log(finalResult);
            return res.status(200).json(finalResult);
        } catch (error) {
            console.error('Lỗi phân tích NLP:', error);
            return res.status(500).json({ message: 'Lỗi server khi gợi ý việc làm' });
        }
    };
}

module.exports = new job_Suggestion_Controller();
