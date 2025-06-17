const Resume_Applied = require('../models/Resume_Applied')
const Job_Post = require('../models/Job_Post')
const User1 = require('../models/User1')
const Resume = require('../models/Resume')
const dayjs = require('dayjs');


class resume_applied_Controller{
    add_Resume_Applied = async(req, res) =>{
        try{
            const {resume_id, email, job_post_id, status, employer_id} = req.body

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})
            if (!resume) {
                return res.status(404).json({error: 'Resume not found'})
            }

            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({error: 'user not found'})
            }

            const job_post = await Job_Post.findOne({_id: job_post_id}, {_id: 1})
            if (!job_post) {
                return res.status(404).json({error: 'job post not found'})
            }

            // const post = await Post.create({
            //     user_id: account._id, 
            //     speciality_id: speciality.id, 
            //     post_title, 
            //     post_content
            // })
            // .populate('user_id', 'email username __t profile_image')
            // .populate('speciality_id', 'name')

            const createdResumeApplied = await Resume_Applied.create({
                resume_id: resume._id,
                user_id: user?._id,
                job_post_id: job_post_id,
                status,
                employer_id: employer_id
            });
    
            // Populate the created post
            const ResumeApplied = await Resume_Applied.findById(createdResumeApplied._id)
                .populate('resume_id')
                .populate('user_id', 'email username phone')
                .populate('job_post_id')

            return res.status(200).json(ResumeApplied)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Resume_Applied = async(req, res) =>{
        try{
            const resume_applied_id = req.params.id
            const {status} = req.body

            const query = {status}

            let resumeApplied = await Resume_Applied.findByIdAndUpdate(
                resume_applied_id,
                query,
                {new: true}
            )
            .populate('resume_id')
            .populate('user_id')
            .populate('job_post_id')
            .populate('employer_id')

            if (!resumeApplied) {
                return res.status(404).json({error: 'Resume Applied not found'})
            }

            return res.status(200).json(resumeApplied)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Resume_Applied = async(req, res) =>{
        try{
            const resume_applied_id = req.params.id

            const appliedResume = await Resume_Applied.findById(resume_applied_id)
                .populate('resume_id')
                .populate('user_id', 'email username phone')
                .populate('job_post_id')
                .populate('employer_id')

            return res.status(200).json(appliedResume)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Resume_Applied_By_User = async(req, res) =>{
        try{
            const {email, role} = req.body

            const user = await User1.findOne({email: email});

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            let resumeApplied;

            if (role === 'user') {
                resumeApplied = await Resume_Applied.find({user_id: user?._id, is_deleted: false})
                .populate({
                    path: 'resume_id',
                    populate: [{
                        path: 'career_id'
                    }, {
                        path: 'city_id'
                    }, {
                        path: 'user_id'
                    }]
                })
                .populate({
                    path: "job_post_id",
                    populate: [{
                    path: "company_id",
                    select: "company_name company_email company_phone cover_image logo"
                    }, {
                    path: "location_id",
                    populate: {
                        path: "city_id"
                    }
                    }]
                })
                .populate('user_id')
                .populate('employer_id')
            } else if (role === 'employer') {
                resumeApplied = await Resume_Applied.find({employer_id: user?._id, is_deleted: false})
                .populate({
                    path: 'resume_id',
                    populate: [{
                        path: 'career_id'
                    }, {
                        path: 'city_id'
                    }, {
                        path: 'user_id'
                    }]
                })
                .populate({
                    path: "job_post_id",
                    populate: [{
                    path: "company_id",
                    select: "company_name company_email company_phone cover_image logo"
                    }, {
                    path: "location_id",
                    populate: {
                        path: "city_id"
                    }
                    }]
                })
                .populate('user_id')
                .populate('employer_id')
            }
            

            return res.status(200).json(resumeApplied )
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Resume_Applied_By_Job_Post = async(req, res) =>{
        try{
            const {job_post_id} = req.body
            
            const resumeApplied = await Resume_Applied.find({job_post_id: job_post_id})

            return res.status(200).json(resumeApplied)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Resume_Applied = async(req, res) =>{
        try{
            
            const resumeApplied = await Resume_Applied.find()
                .populate('resume_id')
                .populate('user_id', 'email username phone')
                .populate('job_post_id')
                .populate('employer_id');

            return res.status(200).json(resumeApplied)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Specific_Resume_Applied = async(req, res) =>{
        try{
            const {job_post_id, email} = req.body

            const user = await User1.findOne({email: email});

            const resume = await Resume_Applied.findOne({job_post_id: job_post_id, user_id: user?._id})
                .populate('job_post_id')
                .populate('user_id', 'email username phone')
                .populate('resume_id')

            return res.status(200).json(resume);
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Resume_Applied = async (req, res) => {
        try {
            // get id list
            const { resume_applied_Ids } = req.body

            // if no ids
            if (
                !resume_applied_Ids ||
                !Array.isArray(resume_applied_Ids) ||
                resume_applied_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Resume_Applied.updateMany(
            {_id: {$in: resume_applied_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Resume Applied soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Resume_Applied = async (req, res) => {
        try {
            // get id list
            const { resume_applied_Ids } = req.body

            // if no ids
            if (
                !resume_applied_Ids ||
                !Array.isArray(resume_applied_Ids) ||
                resume_applied_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Resume_Applied.updateMany(
                {_id: { $in: resume_applied_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Resume Applied restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Resume_Applied = async (req, res) => {
        try {
            // get id list
            const {resume_applied_Ids} = req.body

            // if no ids
            if (
                !resume_applied_Ids ||
                !Array.isArray(resume_applied_Ids) ||
                resume_applied_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Resume_Applied.deleteMany({_id: {$in: resume_applied_Ids}})

            return res.status(200).json({
                message: 'Resume Applied deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Resume_Applied_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }

            const result = await Resume_Applied.updateMany(
                { resume_id: resume_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Resume Applied soft deleted by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Resume_Applied_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Resume_Applied.updateMany(
                { resume_id: resume_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Resume Applied restored by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Resume_Applied_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Resume_Applied.deleteMany({ resume_id: resume_id });
    
            return res.status(200).json({
                message: 'Resume Applied permanently deleted by resume_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    soft_Delete_Resume_Applied_By_Job_Post = async (req, res) => {
        try {
            const { job_post_id } = req.body;
    
            if (!job_post_id) {
                return res.status(400).json({ error: "No job_post_id provided" });
            }

            const result = await Resume_Applied.updateMany(
                { job_post_id: job_post_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Resume Applied soft deleted by job_post_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Resume_Applied_By_Job_Post = async (req, res) => {
        try {
            const { job_post_id } = req.body;
    
            if (!job_post_id) {
                return res.status(400).json({ error: "No job_post_id provided" });
            }
    
            const result = await Resume_Applied.updateMany(
                { job_post_id: job_post_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Resume Applied restored by job_post_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    perma_Delete_Resume_Applied_By_Job_Post = async (req, res) => {
        try {
            const { job_post_id } = req.body;
    
            if (!job_post_id) {
                return res.status(400).json({ error: "No job_post_id provided" });
            }
    
            const result = await Resume_Applied.deleteMany({ job_post_id: job_post_id });
    
            return res.status(200).json({
                message: 'Resume Applied permanently deleted by job_post_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    count_Resume_Applied = async (req, res) => {
        try {
            const applyCount = await Resume_Applied.countDocuments({is_deleted: false});

            return res.status(200).json({ apply: applyCount });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    count_Resume_Applied_By_User = async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User1.findOne({email:email});
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            const applyCount = await Resume_Applied.countDocuments({employer_id: user?._id , is_deleted: false});

            return res.status(200).json({ apply: applyCount });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    statistic_Resume_Applied_By_Status = async (req, res) => {
        try {
            const { start_date, end_date } = req.body;

            const statuses = [
                'Chờ xác nhận',
                'Đã liên hệ',
                'Đã test',
                'Đã phỏng vấn',
                'Trúng tuyển',
                'Không trúng tuyển'
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

            const results = await Resume_Applied.aggregate([
                {
                    $match: {
                        is_deleted: false,
                        createdAt: {
                            $gte: startDate.toDate(),
                            $lte: endDate.toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);

            const count = statuses.map(label => {
                const found = results.find(item => item._id === label);
                return found ? found.count : 0;
            });

            return res.status(200).json({
                labels: statuses,
                count
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };

    statistic_Resume_Applied_By_Status_With_Email = async (req, res) => {
        try {
            const { start_date, end_date, email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "Thiếu trường email" });
            }

            const user = await User1.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy người dùng với email đã cung cấp" });
            }

            const statuses = [
                'Chờ xác nhận',
                'Đã liên hệ',
                'Đã test',
                'Đã phỏng vấn',
                'Trúng tuyển',
                'Không trúng tuyển'
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

            let results;

            if (user?.role === 'employer') {
                results = await Resume_Applied.aggregate([
                    {
                        $match: {
                            is_deleted: false,
                            employer_id: user._id,
                            createdAt: {
                                $gte: startDate.toDate(),
                                $lte: endDate.toDate()
                            }
                        }
                    },
                    {
                        $group: {
                            _id: '$status',
                            count: { $sum: 1 }
                        }
                    }
                ]);
            } else if (user?.role === 'user') {
                results = await Resume_Applied.aggregate([
                    {
                        $match: {
                            is_deleted: false,
                            user_id: user._id,
                            createdAt: {
                                $gte: startDate.toDate(),
                                $lte: endDate.toDate()
                            }
                        }
                    },
                    {
                        $group: {
                            _id: '$status',
                            count: { $sum: 1 }
                        }
                    }
                ]);
            }

            const count = statuses.map(label => {
                const found = results.find(item => item._id === label);
                return found ? found.count : 0;
            });

            return res.status(200).json({
                labels: statuses,
                count
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };


    statistic_Resume_Applied_By_Date = async (req, res) => {
        try {
            const { start_date, end_date, email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "Thiếu trường email" });
            }

            const user = await User1.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy người dùng với email đã cung cấp" });
            }

            const today = dayjs().endOf('day');

            // Tính khoảng thời gian
            const diffDays = (start, end) => dayjs(end).diff(dayjs(start), 'day') + 1;

            let startDate, endDate;

            if (!start_date || !end_date) {
                // Mặc định 14 ngày gần nhất
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

            // Hàm thống kê số lượng Resume_Applied theo khoảng thời gian
            const countByInterval = async (intervals, formatStr) => {
                const appliedCounts = [];

                for (const interval of intervals) {
                    let count;
                    if (user?.role === 'employer') {
                            count = await Resume_Applied.countDocuments({
                            is_deleted: false,
                            employer_id: user._id,
                            createdAt: {
                                $gte: interval.start.toDate(),
                                $lte: interval.end.toDate()
                            }
                        });
                    }
                    else if (user?.role === 'user') {
                            count = await Resume_Applied.countDocuments({
                            is_deleted: false,
                            user_id: user._id,
                            createdAt: {
                                $gte: interval.start.toDate(),
                                $lte: interval.end.toDate()
                            }
                        });
                    }
                    appliedCounts.push(count);
                }

                const labels = intervals.map(i => i.start.format(formatStr));
                return { labels, appliedCounts };
            };

            if (totalDays <= 15) {
                // Thống kê từng ngày
                const intervals = [];
                for (let i = 0; i < totalDays; i++) {
                    intervals.push({
                        start: dayjs(startDate).add(i, 'day').startOf('day'),
                        end: dayjs(startDate).add(i, 'day').endOf('day'),
                    });
                }

                const result = await countByInterval(intervals, 'YYYY-MM-DD');
                return res.status(200).json(result);

            } else if (totalDays > 15 && totalDays <= 30) {
                // Lấy 15 ngày rải đều
                const intervals = [];
                const step = Math.floor(totalDays / 15);

                for (let i = 0; i < 15; i++) {
                    const day = dayjs(startDate).add(i * step, 'day');
                    intervals.push({
                        start: day.startOf('day'),
                        end: day.endOf('day'),
                    });
                }

                const result = await countByInterval(intervals, 'YYYY-MM-DD');
                return res.status(200).json(result);

            } else {
                // Thống kê theo tháng
                const startMonth = startDate.startOf('month');
                const endMonth = endDate.endOf('month');
                const totalMonths = endMonth.diff(startMonth, 'month') + 1;

                const intervals = [];
                for (let i = 0; i < totalMonths; i++) {
                    let monthStart = startMonth.add(i, 'month').startOf('month');
                    let monthEnd = monthStart.endOf('month');

                    if (monthEnd.isAfter(endDate)) {
                        monthEnd = endDate;
                    }

                    intervals.push({
                        start: monthStart,
                        end: monthEnd,
                    });
                }

                const result = await countByInterval(intervals, 'YYYY-MM');
                return res.status(200).json(result);
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };

    getDistinctResumeApplications = async (req, res) => {
        try {
            const { email, role } = req.body

            if (!email || !role) {
                return res.status(400).json({ message: "Email và role là bắt buộc." })
            }

            const user = await User1.findOne({ email }).select('username email profile_image')
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng." })
            }

            if (role === 'user') {
                // Ứng viên -> lấy danh sách các nhà tuyển dụng đã ứng tuyển
                const employerIds = await Resume_Applied
                    .find({ user_id: user._id, is_deleted: false })
                    .distinct('employer_id')

                const employers = await User1.find({ _id: { $in: employerIds } })
                    .select('username email profile_image')

                return res.status(200).json({
                    user: user,
                    distinctEmployers: employers
                })
            } else if (role === 'employer') {
                // Nhà tuyển dụng -> lấy danh sách các ứng viên đã ứng tuyển
                const userIds = await Resume_Applied
                    .find({ employer_id: user._id, is_deleted: false })
                    .distinct('user_id')

                const applicants = await User1.find({ _id: { $in: userIds } })
                    .select('username email profile_image')

                return res.status(200).json({
                    user: user,
                    distinctApplicants: applicants
                })
            } else {
                return res.status(400).json({ message: "Role không hợp lệ. Phải là 'user' hoặc 'employer'." })
            }
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Đã xảy ra lỗi máy chủ." })
        }
    }
}

module.exports = new resume_applied_Controller