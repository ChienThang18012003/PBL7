const Experience_Detail = require('../models/Experience_Detail')
const Resume = require('../models/Resume')


class experience_detail_Controller{
    add_Experience_Detail = async(req, res) =>{
        try{
            const {resume_id, job_name, company_name, start_date, end_date, description} = req.body

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})
            if (!resume) {
                return res.status(404).json({error: 'Resume not found'})
            }

            // const post = await Post.create({
            //     user_id: account._id, 
            //     speciality_id: speciality.id, 
            //     post_title, 
            //     post_content
            // })
            // .populate('user_id', 'email username __t profile_image')
            // .populate('speciality_id', 'name')

            const createdExperienceDetail = await Experience_Detail.create({
                resume_id: resume._id,
                job_name,
                company_name,
                start_date,
                end_date,
                description
            });
    
            // Populate the created post
            const experienceDetail = await Experience_Detail.findById(createdExperienceDetail._id)
                .populate('resume_id')

            return res.status(200).json(experienceDetail)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Experience_Detail = async(req, res) =>{
        try{
            const experience_detail_id = req.params.id

            const experienceDetail = await Experience_Detail.findById(experience_detail_id)
                .populate('resume_id')

            return res.status(200).json(experienceDetail)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Experience_Detail_By_Resume = async(req, res) =>{
        try{
            const {resume_id} = req.body
            
            const experienceDetails = await Experience_Detail.find({resume_id: resume_id})

            return res.status(200).json(experienceDetails)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Experience_Detail = async(req, res) =>{
        try{
            
            const experienceDetails = await Experience_Detail.find()
                .populate('resume_id')

            return res.status(200).json(experienceDetails)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Experience_Detail = async(req, res) =>{
        try{
            const experience_detail_id = req.params.id
            const {resume_id, job_name, company_name, start_date, end_date, description} = req.body

            const query = {job_name, company_name, start_date, end_date, description}

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})

            if(resume){
                query.resume_id = resume._id
            }

            let experienceDetail = await Experience_Detail.findByIdAndUpdate(
                experience_detail_id,
                query,
                {new: true}
            )
            .populate('resume_id')

            if (!experienceDetail) {
                return res.status(404).json({error: 'Experience Detail not found'})
            }

            return res.status(200).json(experienceDetail)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Experience_Detail = async (req, res) => {
        try {
            // get id list
            const { experience_detail_Ids } = req.body

            // if no ids
            if (
                !experience_detail_Ids ||
                !Array.isArray(experience_detail_Ids) ||
                experience_detail_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Experience_Detail.updateMany(
            {_id: {$in: experience_detail_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Experience Detail soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Experience_Detail = async (req, res) => {
        try {
            // get id list
            const { experience_detail_Ids } = req.body

            // if no ids
            if (
                !experience_detail_Ids ||
                !Array.isArray(experience_detail_Ids) ||
                experience_detail_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Experience_Detail.updateMany(
                {_id: { $in: experience_detail_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Experience Detail restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Experience_Detail = async (req, res) => {
        try {
            // get id list
            const {experience_detail_Ids} = req.body
            // if no ids
            if (
                !experience_detail_Ids ||
                !Array.isArray(experience_detail_Ids) ||
                experience_detail_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Experience_Detail.deleteMany({_id: {$in: experience_detail_Ids}})

            return res.status(200).json({
                message: 'Experience Detail deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Experience_Detail_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }

            const result = await Experience_Detail.updateMany(
                { resume_id: resume_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Experience Detail soft deleted by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Experience_Detail_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Experience_Detail.updateMany(
                { resume_id: resume_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Experience Detail restored by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Experience_Detail_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Experience_Detail.deleteMany({ resume_id: resume_id });
    
            return res.status(200).json({
                message: 'Experience Detail permanently deleted by resume_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new experience_detail_Controller