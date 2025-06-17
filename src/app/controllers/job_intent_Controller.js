const Job_Post = require('../models/Job_Post');
const User1 = require('../models/User1');
const Company = require('../models/Company');
const Resume = require('../models/Resume');
const Resume_Applied = require('../models/Resume_Applied');

// Mapping hướng dẫn cho intent "tutorial"
const tutorialGuide = {
  create_resume: "Để tạo hồ sơ, vào trang Hồ sơ cá nhân và nhấn nút 'Tạo hồ sơ mới'.",
  create_feedback: "Bạn có thể gửi phản hồi tại trang Liên hệ hoặc trong phần Cài đặt.",
  list_application: "Danh sách việc làm đã ứng tuyển có thể xem tại trang 'Ứng tuyển của tôi'.",
  list_company_followed: "Vào trang 'Công ty đã theo dõi' để xem danh sách công ty bạn đã lưu.",
  list_job_post_saved: "Việc làm đã lưu có thể xem tại mục 'Việc làm đã lưu' trong trang cá nhân."
};

const handleIntent = async (intent, params) => {
  try {
    const limit = parseInt(params.quantity) || 5;

    switch (intent) {
      case "find_job": {
        const baseQuery = {
            is_deleted: false,
            status: "Đã duyệt",
        };

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
        };
        }

      case "find_company": {
        const baseQuery = { is_deleted: false };

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
        };
        }

      case "find_resume": {
        const baseQuery = { is_deleted: false };
        let resumes = [];

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
        };
    }

      case "find_applications": {
        let appliedQuery = {};
        let appliedList = [];

        // Bước 1: Nếu có email → tìm user → query theo user_id
        if (params.email) {
            const user = await User1.findOne({ email: params.email });
            if (!user) {
            return {
                reply: "Không tìm thấy người dùng với email đã cung cấp.",
                results: [],
            };
            }
            appliedQuery.user_id = user._id;
        }

        // Bước 2: Lấy danh sách ứng tuyển
        appliedList = await Resume_Applied.find(appliedQuery)
            .populate('job_post_id')
            .populate('resume_id');

        // Bước 3: Lọc theo job_name nếu có
        if (params.job_name) {
            const keyword = params.job_name.toLowerCase();
            appliedList = appliedList.filter(app =>
            app.job_post_id?.job_name?.toLowerCase().includes(keyword)
            );
        }

        // Bước 4: Lọc theo resume_name nếu có
        if (params.resume_name) {
            const keyword = params.resume_name.toLowerCase();
            appliedList = appliedList.filter(app =>
            app.resume_id?.desired_position?.toLowerCase().includes(keyword)
            );
        }

        // Bước 5: Cắt giới hạn kết quả
        const limit = parseInt(params.quantity) || 5;
        const limited = appliedList.slice(0, limit);

        const result = limited.map(app => ({
            _id: app.job_post_id?._id,
            job_name: app.job_post_id?.job_name,
        })).filter(x => x._id); // tránh null job_post

        return {
            reply: `Tìm thấy ${result.length} công việc đã ứng tuyển.`,
            results: result,
        };
        }

      case "tutorial": {
        const type = params.type;
        if (tutorialGuide[type]) {
          return { reply: tutorialGuide[type] };
        } else {
          return { reply: "Tôi chưa có hướng dẫn cho yêu cầu này." };
        }
      }

      case "other_question": {
        return { reply: params.answer || "Xin vui lòng cung cấp thêm thông tin." };
      }

      default:
        return {
          reply: "Tôi không hiểu câu hỏi của bạn, vui lòng đặt câu hỏi khác.",
        };
    }
  } catch (err) {
    console.error("Lỗi xử lý intent:", err);
    return { reply: "Có lỗi xảy ra khi xử lý yêu cầu." };
  }
};

module.exports = handleIntent;
