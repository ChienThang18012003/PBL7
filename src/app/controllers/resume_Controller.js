const Resume = require('../models/Resume')
const User1 = require('../models/User1')
const Career = require('../models/Career')
const City = require('../models/City')
const Resume_Saved = require('../models/Resume_Saved')
const Resume_Applied = require('../models/Resume_Applied')
const Education_Detail = require('../models/Education_Detail')
const Experience_Detail = require('../models/Experience_Detail')
const Certificate = require('../models/Certificate')
const Language_Skill = require('../models/Language_Skill')
const Advance_Skill = require('../models/Advance_Skill')
const cloudinary = require('../utils/cloudinary')

const fs = require('fs')
const mongoose = require('mongoose')

require('dotenv').config()

class resume_Controller{
    add_Resume = async(req, res) =>{
        try{
            const {email, is_default, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal} = req.body
            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({error: 'User not found'})
            }

            // const post = await Post.create({
            //     user_id: account._id, 
            //     speciality_id: speciality.id, 
            //     post_title, 
            //     post_content
            // })
            // .populate('user_id', 'email username __t profile_image')
            // .populate('speciality_id', 'name')

            const createdResume = await Resume.create({
                user_id: user?._id,
                desired_position, 
                desired_job_level, 
                experience, 
                academic_level, 
                type_of_workplace, 
                job_type, 
                salary_min, 
                salary_max, 
                city_id, 
                career_id, 
                career_goal,
                is_default
            });
    
            // Populate the created resume
            const resume = await Resume.findById(createdResume._id)
                .populate('city_id')
                .populate('career_id')
                .populate('user_id', 'profile_image username')

            return res.status(200).json(resume)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Resume_Info = async(req, res) =>{
        try{
            // get info from body
            const {desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal} = req.body
            // get id
            const resume_Id = req.params.id

            // find account
            let resume = await Resume.findById(resume_Id)

            if(!resume){
                return res.status(404).json({error: 'Resume not found'})
            }

            // update
            if(desired_position){
                resume.desired_position = desired_position
            }

            if(desired_job_level){
                resume.desired_job_level = desired_job_level
            }

            if(experience){
                resume.experience = experience
            }

            if(academic_level){
                resume.academic_level = academic_level
            }

            if(type_of_workplace){
                resume.type_of_workplace = type_of_workplace
            }

            if(job_type){
                resume.job_type = job_type
            }
            
            if(salary_min){
                resume.salary_min = salary_min
            }

            if(salary_max){
                resume.salary_max = salary_max
            }

            if(city_id){
                resume.city_id = city_id
            }

            if(career_id){
                resume.career_id = career_id
            }

            if(career_goal){
                resume.career_goal = career_goal
            }

            await resume.save()

            resume = await Resume.findById(resume_Id)
            .populate('city_id')
            .populate('career_id')
            
            return res.status(200).json(resume)
        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    upload_Attached_Resume = async (req, res) => {
        try {
            // 1. Kiểm tra file upload
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const { path, size, mimetype } = req.file;

            // 2. Kiểm tra định dạng và dung lượng
            if (mimetype !== 'application/pdf' || size === 0) {
                await fs.promises.unlink(path); // Xoá file lỗi
                return res.status(400).json({ error: "Invalid PDF file" });
            }

            // 3. Chuẩn bị thông tin upload
            const resume_Id = req.params.id;
            const pdf_name = `${resume_Id}`;

            // 4. Tìm resume và xóa file cũ nếu có
            const resume = await Resume.findById(resume_Id);
            if (!resume) {
                await fs.promises.unlink(path);
                return res.status(404).json({ error: "Resume not found" });
            }

            // 5. Upload PDF mới lên Cloudinary
            const uploadResult = await cloudinary.uploader.upload(path, {
                folder: "PBL7/resumes",
                public_id: pdf_name,
                resource_type: "raw", // BẮT BUỘC với PDF
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            });

            const attached_file = uploadResult.secure_url;

            // 6. Xoá file tạm sau khi upload
            try {
                await fs.promises.unlink(path);
            } catch (err) {
                console.warn("Failed to delete temp file:", err.message);
            }

            // 7. Cập nhật lại attached_file trong CSDL
            resume.attached_file = attached_file;
            await resume.save();

            return res.status(200).json(resume);
        } catch (error) {
            console.error("Error uploading PDF:", error);
            return res.status(500).json({ error: error.message });
        }
    };




    get_Resume = async(req, res) =>{
        try{
            const resume_id = req.params.id

            const resume = await Resume.findById(resume_id)
                .populate('city_id')
                .populate('career_id')
                .populate({
                path: 'user_id',
                populate: {
                    path: 'location_id',
                    populate: [
                        { path: 'district_id' },
                        { path: 'city_id' }
                    ]
                }
            });

            return res.status(200).json(resume)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Default_Resume = async(req, res) =>{
        try{
            const {email} = req.body
            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const resume = await Resume.findOne({is_default: true, user_id: user?._id})
                .populate('city_id')
                .populate('career_id')
                .populate({
                path: 'user_id',
                populate: {
                    path: 'location_id',
                    populate: [
                        { path: 'district_id' },
                        { path: 'city_id' }
                    ]
                }
            });

            return res.status(200).json(resume)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Attached_Resume = async(req, res) =>{
        try{
            const {email} = req.body
            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const resume = await Resume.find({is_default: false, user_id: user?._id})
                .populate('city_id')
                .populate('career_id')
                .populate({
                path: 'user_id',
                populate: {
                    path: 'location_id',
                    populate: [
                        { path: 'district_id' },
                        { path: 'city_id' }
                    ]
                }
            });

            return res.status(200).json(resume)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Resume = async(req, res) =>{
        try{
            let resumes
            const { is_deleted } = req.body;

            let query = {}

            if (is_deleted !== undefined) {
                query.is_deleted = JSON.parse(is_deleted);
            }

            resumes = await Resume.find(query)
                .populate('city_id')
                .populate('career_id')
                .populate({
                path: 'user_id',
                populate: {
                    path: 'location_id',
                    populate: [
                        { path: 'district_id' },
                        { path: 'city_id' }
                    ]
                }
            });
            return res.status(200).json(resumes)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Resumes_By_Email = async (req, res) => {
        try {
            const { is_deleted, email } = req.body;

            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            let query = { user_id: user?._id };

            if (is_deleted !== undefined) {
                query.is_deleted = JSON.parse(is_deleted);
            }

            const resumes = await Resume.find(query)
                .populate('city_id')
                .populate('career_id')
                .populate({
                path: 'user_id',
                populate: {
                    path: 'location_id',
                    populate: [
                        { path: 'district_id' },
                        { path: 'city_id' }
                    ]
                }
            });

            return res.status(200).json(resumes);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    get_Filtered_Resume_List = async(req, res) =>{
        try{
            const {city_name, career_name} = req.body

            let query = {}

            if(city_name){
                const city_id = await City.findOne({name: city_name }, {_id: 1})
                query.city_id = city_id._id
            }

            if(career_name){
                const career_id = await Career.findOne({career_name: career_name }, {_id: 1})
                query.career_id = career_id._id
            }

            const resumes = await Resume.find(query)
            .populate("user_id", "username email phone profile_image")
            .populate('city_id')
            .populate('career_id')

            return res.status(200).json(resumes)
        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Resume= async (req, res) => {
        try {
            // get id list
            const { resume_Ids } = req.body

            // if no ids
            if (
                !resume_Ids ||
                !Array.isArray(resume_Ids) ||
                resume_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Resume.updateMany(
            {_id: {$in: resume_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Resume soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Resume= async (req, res) => {
        try {
            // get id list
            const { resume_Ids } = req.body

            // if no ids
            if (
                !resume_Ids ||
                !Array.isArray(resume_Ids) ||
                resume_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Resume.updateMany(
                {_id: { $in: resume_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Resume restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Resume = async (req, res) => {
    try {
        const { resume_Ids } = req.body;

        if (!resume_Ids || !Array.isArray(resume_Ids) || resume_Ids.length === 0) {
            return res.status(400).json({ error: 'No IDs provided' });
        }

        // Lấy danh sách resume trước khi xoá
        const resumes = await Resume.find({ _id: { $in: resume_Ids } });

        // Xoá các file attached_file trên Cloudinary nếu có
            for (const resume of resumes) {
                if (resume.attached_file) {
                    try {
                        const url = new URL(resume.attached_file);
                        const parts = url.pathname.split('/');
                        const filenameWithExt = parts[parts.length - 1];
                        const filename = filenameWithExt.replace(/\.pdf$/, '');
                        const public_id = `PBL7/resumes/${filename}`;

                        await cloudinary.uploader.destroy(public_id, {
                            resource_type: "raw"
                        });

                        console.log(`Deleted Cloudinary file: ${public_id}`);
                    } catch (err) {
                        console.warn(`Failed to delete Cloudinary file for resume ${resume._id}: ${err.message}`);
                    }
                }
            }

            await Resume_Saved.deleteMany({ resume_id: { $in: resume_Ids } });
            await Resume_Applied.deleteMany({ resume_id: { $in: resume_Ids } });
            await Education_Detail.deleteMany({ resume_id: { $in: resume_Ids } });
            await Experience_Detail.deleteMany({ resume_id: { $in: resume_Ids } });
            await Certificate.deleteMany({ resume_id: { $in: resume_Ids } });
            await Language_Skill.deleteMany({ resume_id: { $in: resume_Ids } });
            await Advance_Skill.deleteMany({ resume_id: { $in: resume_Ids } });
            // Xoá bản ghi trong CSDL
            const result = await Resume.deleteMany({ _id: { $in: resume_Ids } });

            return res.status(200).json({
                message: 'Resumes deleted',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    
    soft_Delete_Resume_By_UserID = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }

            const result = await Resume.updateMany(
                { user_id: user_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Resume soft deleted by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Resume_By_UserId = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Resume.updateMany(
                { user_id: user_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Resume restored by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Resume_By_UserId = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Resume.deleteMany({ user_id: user_id });
    
            return res.status(200).json({
                message: 'Resume permanently deleted by user_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new resume_Controller