const Job_Post = require("../models/Job_Post");
const Job_Post_Saved = require("../models/Job_Post_Saved");
const Resume_Applied = require("../models/Resume_Applied");
const Company = require("../models/Company");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
const fs = require("fs");
const User1 = require("../models/User1");
require("dotenv").config();
const dayjs = require('dayjs');

class job_post_Controller {
    add_Job_Post = async (req, res) => {
        try {
            const {
                email,
                career_id,
                company_id,
                location_id,
                job_name,
                deadline,
                quantity,
                status,
                view,
                position,
                type_of_workplace,
                experience,
                academic_level,
                job_type,
                salary_min,
                salary_max,
                job_description,
                job_requirement,
                gender_required,
                contact_person_name,
                contact_person_phone,
                contact_person_email,
                benefit_enjoyed,
                is_urgent
            } = req.body;

            const user = await User1.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let job_post = await Job_Post.create({
                user_id: user._id,
                career_id,
                company_id,
                location_id,
                job_name,
                deadline,
                quantity,
                status,
                view,
                position,
                type_of_workplace,
                experience,
                academic_level,
                job_type,
                salary_min,
                salary_max,
                job_description,
                job_requirement,
                gender_required,
                contact_person_name,
                contact_person_phone,
                contact_person_email,
                benefit_enjoyed,
                is_urgent
            });

            job_post = await Job_Post.findById(job_post._id)
                .populate("career_id")
                .populate({
                    path: "location_id",
                    populate: [
                        { path: "city_id" },
                        { path: "district_id" }
                    ]
                })
                .populate("user_id", "email phone profile_image username")
                .populate("company_id", "company_name company_email company_phone cover_image logo");

            const appliedCount = await Resume_Applied.countDocuments({
                job_post_id: job_post._id,
                is_deleted: false
            });

            const job_post_with_applied = {
                ...job_post.toObject(),
                applied_count: appliedCount
            };

            return res.status(201).json(job_post_with_applied);
        } catch (error) {
            console.error("Error occurred:", error);
            return res.status(400).json({ error: error.message });
        }
    };



    update_Job_Post = async (req, res) => {
        try {
            const job_post_id = req.params.id;
            const {
                career_id,
                company_id,
                location_id,
                job_name,
                deadline,
                quantity,
                status,
                view,
                position,
                type_of_workplace,
                experience,
                academic_level,
                job_type,
                salary_min,
                salary_max,
                job_description,
                job_requirement,
                gender_required,
                contact_person_name,
                contact_person_phone,
                contact_person_email,
                benefit_enjoyed,
                is_urgent,
            } = req.body;

            let job_post = await Job_Post.findById(job_post_id);
            if (!job_post) return res.status(404).json({ error: "Job Post not found" });

            if (career_id) job_post.career_id = career_id;
            if (company_id) job_post.company_id = company_id;
            if (location_id) job_post.location_id = location_id;
            if (job_name) job_post.job_name = job_name;
            if (deadline) job_post.deadline = deadline;
            if (quantity) job_post.quantity = quantity;
            if (status) job_post.status = status;
            if (view) job_post.view = view;
            if (position) job_post.position = position;
            if (type_of_workplace) job_post.type_of_workplace = type_of_workplace;
            if (experience) job_post.experience = experience;
            if (academic_level) job_post.academic_level = academic_level;
            if (job_type) job_post.job_type = job_type;
            if (salary_min) job_post.salary_min = salary_min;
            if (salary_max) job_post.salary_max = salary_max;
            if (job_description) job_post.job_description = job_description;
            if (job_requirement) job_post.job_requirement = job_requirement;
            if (gender_required) job_post.gender_required = gender_required;
            if (contact_person_name) job_post.contact_person_name = contact_person_name;
            if (contact_person_phone) job_post.contact_person_phone = contact_person_phone;
            if (contact_person_email) job_post.contact_person_email = contact_person_email;
            if (benefit_enjoyed) job_post.benefit_enjoyed = benefit_enjoyed;
            if (typeof is_urgent !== 'undefined') job_post.is_urgent = is_urgent;

            await job_post.save();

            job_post = await Job_Post.findById(job_post._id)
                .populate("career_id")
                .populate({
                    path: "location_id",
                    populate: [
                        { path: "city_id" },
                        { path: "district_id" }
                    ]
                })
                .populate("user_id", "email phone profile_image username")
                .populate("company_id", "company_name company_email company_phone cover_image logo");

            const appliedCount = await Resume_Applied.countDocuments({
                job_post_id: job_post._id,
                is_deleted: false
            });

            const job_post_with_applied = {
                ...job_post.toObject(),
                applied_count: appliedCount
            };

            return res.status(200).json(job_post_with_applied);
        } catch (error) {
            console.error('Error updating job post:', error.message);
            return res.status(400).json({ error: error.message });
        }
    };


  get_Job_Post_List = async (req, res) => {
    try {
        let job_posts

            job_posts = await Job_Post.find()
            .populate("career_id")
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })
            .populate("user_id", "email phone profile_image username")
            .populate("company_id", "company_name company_email company_phone cover_image logo")
            .lean()

            const postsWithAppliedCount = await Promise.all(
                job_posts.map(async (post) => {
                    const appliedCount = await Resume_Applied.countDocuments({
                        job_post_id: post._id,
                        is_deleted: false
                    });
                    return {
                        ...post,
                        applied_count: appliedCount
                    };
                })
            );

        return res.status(200).json(postsWithAppliedCount)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
  }

  get_Job_Post = async (req, res) => {
    try {
        const id = req.params.id
        //   console.log("Received region_Id:", region_Id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false, message: 'Invalid History ID format'
            })
        }

        const job_post = await Job_Post.findById(id)
            .populate("career_id")
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })
            .populate("user_id", "email phone profile_image username")
            .populate("company_id", "company_name company_email company_phone cover_image logo")

        if (!job_post) {
            return res.status(404).json({
                success: false, message: 'Job Post not found'
            })
        }

        return res.status(200).json({success: true, data: job_post })
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(500).json({success: false, error: error.message})
    }
  }

    get_Job_Post_By_Email = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User1.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const job_posts = await Job_Post.find({ user_id: user._id })
                .populate("career_id")
                .populate({
                    path: "location_id",
                    populate: [
                        { path: "city_id" },
                        { path: "district_id" }
                    ]
                })
                .populate("user_id", "email phone profile_image username")
                .populate("company_id", "company_name company_email company_phone cover_image logo")
                .lean(); // lean để làm việc với plain JS object, dễ thêm dữ liệu

            // Đếm số lượng Resume_Applied cho mỗi Job_Post
            const postsWithAppliedCount = await Promise.all(
                job_posts.map(async (post) => {
                    const appliedCount = await Resume_Applied.countDocuments({
                        job_post_id: post._id,
                        is_deleted: false
                    });
                    return {
                        ...post,
                        applied_count: appliedCount
                    };
                })
            );

            return res.status(200).json({ success: true, data: postsWithAppliedCount });

        } catch (error) {
            console.log('Error:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    };

    get_Job_Post_By_Company = async (req, res) => {
        try {
            const { company_id } = req.body;

            const company = await Company.findOne({ _id: company_id });

            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }

            const job_posts = await Job_Post.find({ company_id: company?._id, is_deleted: false, status: "Đã duyệt" })
                .populate("career_id")
                .populate({
                    path: "location_id",
                    populate: [
                        { path: "city_id" },
                        { path: "district_id" }
                    ]
                })
                .populate("user_id", "email phone profile_image username")
                .populate("company_id", "company_name company_email company_phone cover_image logo")
                .lean(); // lean để làm việc với plain JS object, dễ thêm dữ liệu

            // Đếm số lượng Resume_Applied cho mỗi Job_Post
            const postsWithAppliedCount = await Promise.all(
                job_posts.map(async (post) => {
                    const appliedCount = await Resume_Applied.countDocuments({
                        job_post_id: post._id,
                        is_deleted: false
                    });
                    return {
                        ...post,
                        applied_count: appliedCount
                    };
                })
            );

            return res.status(200).json({ success: true, data: postsWithAppliedCount });

        } catch (error) {
            console.log('Error:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    };

    get_Job_Post_Name_By_Email = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User1.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const job_posts = await Job_Post.find({ user_id: user._id })
                .populate("career_id")
                .populate({
                    path: "location_id",
                    populate: [
                        { path: "city_id" },
                        { path: "district_id" }
                    ]
                })
                .populate("user_id", "email phone profile_image username")
                .populate("company_id", "company_name company_email company_phone cover_image logo")
                .lean();

            // Chỉ lấy job_name
            const jobNames = job_posts.map(post => post.job_name);

            return res.status(200).json({ success: true, data: jobNames });

        } catch (error) {
            console.log('Error:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    };



    filterJobPostList = async (req, res) => {
        try {
            const { city_id, career_id, is_urgent } = req.body || {};

            // Kiểm tra city_id và career_id hợp lệ
            if (city_id && !mongoose.Types.ObjectId.isValid(city_id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid city ID format',
                });
            }

            if (career_id && !mongoose.Types.ObjectId.isValid(career_id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid career ID format',
                });
            }

            // Tạo điều kiện tìm kiếm ban đầu
            const filterConditions = {
                is_deleted: false,
                status: 'Đã duyệt',
                deadline: { $gte: dayjs().startOf('day').toDate() },
            };

            if (typeof is_urgent === 'boolean') {
                filterConditions.is_urgent = is_urgent;
            }

            // Truy vấn từ DB
            const jobposts = await Job_Post.find(filterConditions)
                .populate({
                    path: 'location_id',
                    populate: { path: 'city_id' },
                })
                .populate('career_id')
                .populate('user_id', 'email phone profile_image username')
                .populate('company_id', 'company_name company_email company_phone cover_image logo');

            // Lọc theo city_id và career_id nếu được truyền
            const filteredJobPosts = jobposts.filter((jobpost) => {
                const matchCity = !city_id || (
                    jobpost.location_id &&
                    jobpost.location_id.city_id &&
                    jobpost.location_id.city_id._id.toString() === city_id
                );

                const matchCareer = !career_id || (
                    jobpost.career_id &&
                    jobpost.career_id._id.toString() === career_id
                );

                return matchCity && matchCareer;
            });

            return res.status(200).json({
                success: true,
                data: filteredJobPosts,
            });
        } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    };

    filter_Job_Posts = async (req, res) => {
        try {
            const { career_id, company_id } = req.body;

            const filter = { is_deleted: false };

            if (career_id) {
                filter.career_id = career_id;
            }

            if (company_id) {
                filter.company_id = company_id;
            }

            const jobPosts = await Job_Post.find(filter);

            return res.status(200).json(jobPosts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server." });
        }
    };

    get_Job_Post_By_Ids = async (req, res) => {
        try {
            const { job_post_ids } = req.body;

            if (!Array.isArray(job_post_ids) || job_post_ids.length === 0) {
                return res.status(400).json({ message: "job_post_ids must be a non-empty array." });
            }

            console.log(job_post_ids);

            const job_posts = await Job_Post.find({ _id: { $in: job_post_ids } })
                .populate("career_id")
                .populate({
                    path: "location_id",
                    populate: [
                        { path: "city_id" },
                        { path: "district_id" }
                    ]
                })
                .populate("user_id", "email phone profile_image username")
                .populate("company_id", "company_name company_email company_phone cover_image logo")

            console.log(job_posts);

            return res.status(200).json({ success: true, data: job_posts });

        } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    };


    update_Job_Post_View = async (req, res) => {
        try {
          const { id } = req.params;
      
          const jobPost = await Job_Post.findById(id);
      
          if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
          }
      
          jobPost.view = (jobPost.view || 0) + 1;
      
          await jobPost.save();
      
          return res.status(200).json({ message: "View count updated", view: jobPost.view });
        } catch (error) {
          console.error("Error updating job post view:", error);
          return res.status(500).json({ error: error.message });
        }
    };

    update_Job_Post_Status = async (req, res) => {
        try {
          const { id } = req.params;

          const { status } = req.body;
      
          const jobPost = await Job_Post.findById(id);
      
          if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
          }
      
          jobPost.status = status;
      
          await jobPost.save();
      
          return res.status(200).json({ message: "View count updated", view: jobPost.view, _id: jobPost._id });
        } catch (error) {
          console.error("Error updating job post view:", error);
          return res.status(500).json({ error: error.message });
        }
    };

    delete_Job_Post = async (req, res) => {
        try {
            const job_post_id = req.params.id;
    
            const job_post = await Job_Post.findById(job_post_id);
            if (!job_post) return res.status(404).json({ error: "job post not found" });
    
            await Job_Post.findByIdAndDelete(job_post_id);
            await Job_Post_Saved.deleteMany({ job_post_id: job_post_id});
            await Resume_Applied.deleteMany({ job_post_id: job_post_id});
    
            return res.status(200).json({
                message: "job post deleted successfully",
                job_post_id
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    delete_Job_Post_By_Company = async (req, res) => {
        try {
            const company_id = req.params.id;
    
            const company = await Company.find({_id: company_id});
            if (!company) return res.status(404).json({ error: "Company not found" });
    
            await Job_Post.deleteMany({company_id: company_id});
    
            return res.status(200).json({
                message: "Job post deleted successfully"
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
    

  soft_Delete_Job_Post = async (req, res) => {
      try {
          // get id list
          const { job_post_Ids } = req.body

          // if no ids
          if (
              !job_post_Ids ||
              !Array.isArray(job_post_Ids) ||
              job_post_Ids.length === 0
          ) {
              return res.status(400).json({ error: "No IDs provided" })
          }

          // update
          const result = await Job_Post.updateMany(
          {_id: {$in: job_post_Ids}},
          {is_deleted: true}
          )

          return res.status(200).json({
              message: 'Job post soft deleted',
              modifiedCount: result.modifiedCount,
          })
      } catch (error) {
          console.log(error.message)
          return res.status(400).json({error: error.message})
      }
  }

  restore_Deleted_Job_Post = async (req, res) => {
      try {
          // get id list
          const { job_post_Ids } = req.body

          // if no ids
          if (
              !job_post_Ids ||
              !Array.isArray(job_post_Ids) ||
              job_post_Ids.length === 0
          ) {
              return res.status(400).json({error: 'No IDs provided'})
          }

          // update
          const result = await Job_Post.updateMany(
              {_id: { $in: job_post_Ids}},
              {is_deleted: false}
          )

          return res.status(200).json({
              message: 'Job post restored',
              modifiedCount: result.modifiedCount,
          })
      } catch (error) {
          console.log(error.message)
          return res.status(400).json({error: error.message})
      }
  }

  soft_Delete_Job_Post_By_Company = async (req, res) => {
        try {
            const { company_id } = req.body;
    
            if (!company_id) {
                return res.status(400).json({ error: "No company_id provided" });
            }

            const result = await Job_Post.updateMany(
                { company_id: company_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Job post soft deleted by company_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Job_Post_By_Company = async (req, res) => {
        try {
            const { company_id } = req.body;
    
            if (!company_id) {
                return res.status(400).json({ error: "No company_id provided" });
            }
    
            const result = await Company.updateMany(
                { company_id: company_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Job post restored by company_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    count_Job_Post = async (req, res) => {
        try {
            const jobCount = await Job_Post.countDocuments();

            return res.status(200).json({ job: jobCount });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    count_Job_Post_By_User = async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User1.findOne({email:email});
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            const totalJobCount = await Job_Post.countDocuments({user_id: user?._id});
            const pendingJobCount = await Job_Post.countDocuments({user_id: user?._id, status: 'Chờ duyệt'});
            const now = new Date();
            const expiredJobCount = await Job_Post.countDocuments({
                user_id: user?._id,
                deadline: { $lt: now }
            });
            return res.status(200).json({ job: totalJobCount, pending: pendingJobCount, expired: expiredJobCount });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    statistic_Job_Post_By_Status = async (req, res) => {
        try {
            const { start_date, end_date } = req.body;
            const today = dayjs().endOf('day');

            const diffDays = (start, end) => dayjs(end).diff(dayjs(start), 'day') + 1;

            let startDate, endDate;

            if (!start_date || !end_date) {
                endDate = today;
                startDate = dayjs(endDate).subtract(14, 'day').startOf('day');
            } else {
                startDate = dayjs(start_date).startOf('day');
                endDate = dayjs(end_date).endOf('day');

                if (startDate.isAfter(endDate)) {
                    return res.status(400).json({ error: "start_date phải nhỏ hơn hoặc bằng end_date" });
                }
            }

            const totalDays = diffDays(startDate, endDate);

            const countByInterval = async (intervals, formatStr) => {
                const choDuyet = [];
                const daDuyet = [];
                const khongDuyet = [];

                for (const interval of intervals) {
                    const from = interval.start.toDate();
                    const to = interval.end.toDate();

                    const countChoDuyet = await Job_Post.countDocuments({
                        status: 'Chờ duyệt',
                        created_at: { $gte: from, $lte: to },
                    });

                    const countDaDuyet = await Job_Post.countDocuments({
                        status: 'Đã duyệt',
                        created_at: { $gte: from, $lte: to },
                    });

                    const countKhongDuyet = await Job_Post.countDocuments({
                        status: 'Không duyệt',
                        created_at: { $gte: from, $lte: to },
                    });

                    choDuyet.push(countChoDuyet);
                    daDuyet.push(countDaDuyet);
                    khongDuyet.push(countKhongDuyet);
                }

                const labels = intervals.map(i => i.start.format(formatStr));
                return { labels, choDuyet, daDuyet, khongDuyet };
            };

            if (totalDays <= 15) {
                const intervals = Array.from({ length: totalDays }, (_, i) => {
                    const day = dayjs(startDate).add(i, 'day');
                    return { start: day.startOf('day'), end: day.endOf('day') };
                });

                const result = await countByInterval(intervals, 'YYYY-MM-DD');
                return res.status(200).json(result);

            } else if (totalDays > 15 && totalDays <= 30) {
                const step = Math.floor(totalDays / 15);
                const intervals = Array.from({ length: 15 }, (_, i) => {
                    const day = dayjs(startDate).add(i * step, 'day');
                    return { start: day.startOf('day'), end: day.endOf('day') };
                });

                const result = await countByInterval(intervals, 'YYYY-MM-DD');
                return res.status(200).json(result);

            } else {
                const startMonth = startDate.startOf('month');
                const endMonth = endDate.endOf('month');
                const totalMonths = endMonth.diff(startMonth, 'month') + 1;

                const intervals = [];
                for (let i = 0; i < totalMonths; i++) {
                    let monthStart = startMonth.add(i, 'month').startOf('month');
                    let monthEnd = monthStart.endOf('month');

                    if (monthEnd.isAfter(endDate)) monthEnd = endDate;

                    intervals.push({ start: monthStart, end: monthEnd });
                }

                const result = await countByInterval(intervals, 'YYYY-MM');
                return res.status(200).json(result);
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };

    statistic_Job_Post_By_Academic_Level_With_Email = async (req, res) => {
        try {
            const { start_date, end_date, email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "Thiếu trường email" });
            }

            const user = await User1.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy người dùng với email đã cung cấp" });
            }

            const academicLevels = [
                'Đại học',
                'Trên đại học',
                'Cao đẳng',
                'Trung cấp',
                'Trung học',
                'Chứng chỉ nghề'
            ];

            const today = dayjs().endOf('day');
            const startDate = start_date
                ? dayjs(start_date).startOf('day')
                : dayjs(today).subtract(29, 'day').startOf('day');

            const endDate = end_date
                ? dayjs(end_date).endOf('day')
                : today;

            if (startDate.isAfter(endDate)) {
                return res.status(400).json({ error: "start_date phải nhỏ hơn hoặc bằng end_date" });
            }

            const results = await Job_Post.aggregate([
                {
                    $match: {
                        is_deleted: false,
                        user_id: user._id,
                        created_at: {
                            $gte: startDate.toDate(),
                            $lte: endDate.toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: '$academic_level',
                        count: { $sum: 1 }
                    }
                }
            ]);

            const count = academicLevels.map(level => {
                const found = results.find(item => item._id === level);
                return found ? found.count : 0;
            });

            return res.status(200).json({
                labels: academicLevels,
                count
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };

    statistic_Top5_Job_Post_By_Resume_Applied = async (req, res) => {
        try {
            const { start_date, end_date, email } = req.body;
            const today = dayjs().endOf('day');

            if (!email) {
                return res.status(400).json({ error: "Thiếu trường email" });
            }

            const user = await User1.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy người dùng với email đã cung cấp" });
            }

            let startDate, endDateFinal;
            if (!start_date || !end_date) {
                endDateFinal = today;
                startDate = dayjs(endDateFinal).subtract(29, 'day').startOf('day');
            } else {
                startDate = dayjs(start_date).startOf('day');
                endDateFinal = dayjs(end_date).endOf('day');

                if (startDate.isAfter(endDateFinal)) {
                    return res.status(400).json({ error: "start_date phải nhỏ hơn hoặc bằng end_date" });
                }
            }

            const result = await Resume_Applied.aggregate([
                {
                    $match: {
                        is_deleted: false,
                        createdAt: {
                            $gte: startDate.toDate(),
                            $lte: endDateFinal.toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: "$job_post_id",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $lookup: {
                        from: "job_posts",
                        localField: "_id",
                        foreignField: "_id",
                        as: "job_post"
                    }
                },
                {
                    $unwind: "$job_post"
                },
                {
                    $match: {
                        "job_post.user_id": user._id
                    }
                },
                {
                    $project: {
                        _id: 0,
                        job_name: "$job_post.job_name",
                        count: 1
                    }
                },
                {
                    $limit: 5
                }
            ]);

            const labels = result.map(item => item.job_name);
            const counts = result.map(item => item.count);

            return res.status(200).json({ labels, counts });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };
}

module.exports = new job_post_Controller();
