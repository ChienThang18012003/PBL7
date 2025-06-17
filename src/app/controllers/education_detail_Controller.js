const Education_Detail = require('../models/Education_Detail')
const Resume = require('../models/Resume')


class education_detail_Controller{
    add_Education_Detail = async(req, res) =>{
        try{
            const {resume_id, degree_name, major, training_place_name, start_date, completed_date, description} = req.body

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

            const createdEducationDetail = await Education_Detail.create({
                resume_id: resume._id,
                degree_name, 
                major, 
                training_place_name, 
                start_date, 
                completed_date,
                description
            });
    
            // Populate the created post
            const educationDetail = await Education_Detail.findById(createdEducationDetail._id)
                .populate('resume_id')

            return res.status(200).json(educationDetail)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Education_Detail = async(req, res) =>{
        try{
            const education_detail_id = req.params.id

            const educationDetail = await Education_Detail.findById(education_detail_id)
                .populate('resume_id')

            return res.status(200).json(educationDetail)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Education_Detail_By_Resume = async(req, res) =>{
        try{
            const {resume_id} = req.body
            
            const educationDetails = await Education_Detail.find({resume_id: resume_id})

            return res.status(200).json(educationDetails)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Education_Detail = async(req, res) =>{
        try{
            
            const educationDetails = await Education_Detail.find()
                .populate('resume_id')

            return res.status(200).json(educationDetails)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Education_Detail = async(req, res) =>{
        try{
            const education_detail_id = req.params.id
            const {resume_id, degree_name, major, training_place_name, start_date, completed_date, description} = req.body

            const query = {degree_name, major, training_place_name, start_date, completed_date, description}

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})

            if(resume){
                query.resume_id = resume._id
            }

            let educationDetail = await Education_Detail.findByIdAndUpdate(
                education_detail_id,
                query,
                {new: true}
            )
            .populate('resume_id')

            if (!educationDetail) {
                return res.status(404).json({error: 'Education Detail not found'})
            }

            return res.status(200).json(educationDetail)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Education_Detail = async (req, res) => {
        try {
            // get id list
            const { education_detail_Ids } = req.body

            // if no ids
            if (
                !education_detail_Ids ||
                !Array.isArray(education_detail_Ids) ||
                education_detail_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Education_Detail.updateMany(
            {_id: {$in: education_detail_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Education Detail soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Education_Detail = async (req, res) => {
        try {
            // get id list
            const { education_detail_Ids } = req.body

            // if no ids
            if (
                !education_detail_Ids ||
                !Array.isArray(education_detail_Ids) ||
                education_detail_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Education_Detail.updateMany(
                {_id: { $in: education_detail_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Education Detail restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Education_Detail = async (req, res) => {
        try {
            // get id list
            const {education_detail_Ids} = req.body

            // if no ids
            if (
                !education_detail_Ids ||
                !Array.isArray(education_detail_Ids) ||
                education_detail_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Education_Detail.deleteMany({_id: {$in: education_detail_Ids}})

            return res.status(200).json({
                message: 'Education Detail deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Education_Detail_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }

            const result = await Education_Detail.updateMany(
                { resume_id: resume_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Education Detail soft deleted by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Education_Detail_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Education_Detail.updateMany(
                { resume_id: resume_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Education Detail restored by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Education_Detail_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Education_Detail.deleteMany({ resume_id: resume_id });
    
            return res.status(200).json({
                message: 'Education Detail permanently deleted by resume_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new education_detail_Controller