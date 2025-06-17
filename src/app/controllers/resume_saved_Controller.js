const Resume_Saved = require('../models/Resume_Saved')
const User1 = require('../models/User1')
const Resume = require('../models/Resume')


class resume_saved_Controller{
    add_Resume_Saved = async(req, res) =>{
        try{
            const {resume_id, email} = req.body

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})
            if (!resume) {
                return res.status(404).json({error: 'Resume not found'})
            }

            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({error: 'user not found'})
            }

            // const post = await Post.create({
            //     user_id: account._id, 
            //     speciality_id: speciality.id, 
            //     post_title, 
            //     post_content
            // })
            // .populate('user_id', 'email username __t profile_image')
            // .populate('speciality_id', 'name')

            const createdResumeSaved = await Resume_Saved.create({
                resume_id: resume._id,
                user_id: user?._id
            });
    
            // Populate the created post
            const resumeSaved = await Resume_Saved.findById(createdResumeSaved._id)
                .populate('user_id', 'email username phone')
                .populate({
                    path: 'resume_id',
                    populate: [
                        {path: 'city_id'},
                        {path: 'career_id'},
                        {path: 'user_id'}
                    ]
                });

            return res.status(200).json(resumeSaved)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Specific_Resume_Saved = async(req, res) =>{
        try{
            const {resume_id, email} = req.body

            const user = await User1.findOne({email: email});

            const resume = await Resume_Saved.findOne({resume_id: resume_id, user_id: user?._id})
                .populate('user_id', 'email username phone')
                .populate('resume_id')

            return res.status(200).json(resume);
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Resume_Saved = async(req, res) =>{
        try{
            const resume_saved_id = req.params.id

            const savedResume = await Resume_Saved.findById(resume_saved_id)
                .populate('resume_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(savedResume)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Resume_Saved_By_User = async(req, res) =>{
        try{
            const {email} = req.body

            const user = await User1.findOne({email:email, is_deleted: false});

            if (!user) {
                return res.status(400).json({error: "User not found"})
            }
            
            const resumeSaved = await Resume_Saved.find({user_id: user?._id})
                .populate("user_id")
                .populate({
                    path: 'resume_id',
                    populate: [
                        {path: 'city_id'},
                        {path: 'career_id'},
                        {path: 'user_id'}
                    ]
                });

            return res.status(200).json(resumeSaved )
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Resume_Saved = async(req, res) =>{
        try{
            
            const resumeSaved = await Resume_Saved.find()
                .populate('user_id', 'email username phone')
                .populate({
                    path: 'resume_id',
                    populate: [
                        {path: 'city_id'},
                        {path: 'career_id'},
                        {path: 'user_id'}
                    ]
                });

            return res.status(200).json(resumeSaved)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Resume_Saved = async (req, res) => {
        try {
            // get id list
            const { resume_saved_Ids } = req.body

            // if no ids
            if (
                !resume_saved_Ids ||
                !Array.isArray(resume_saved_Ids) ||
                resume_saved_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Resume_Saved.updateMany(
            {_id: {$in: resume_saved_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Resume Saved soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Resume_Saved = async (req, res) => {
        try {
            // get id list
            const { resume_saved_Ids } = req.body

            // if no ids
            if (
                !resume_saved_Ids ||
                !Array.isArray(resume_saved_Ids) ||
                resume_saved_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Resume_Saved.updateMany(
                {_id: { $in: resume_saved_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Resume Saved restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Resume_Saved = async (req, res) => {
        try {
            // get id list
            const {resume_saved_Ids} = req.body

            // if no ids
            if (
                !resume_saved_Ids ||
                !Array.isArray(resume_saved_Ids) ||
                resume_saved_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Resume_Saved.deleteMany({_id: {$in: resume_saved_Ids}})

            return res.status(200).json({
                message: 'Resume Saved deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Resume_Saved_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }

            const result = await Resume_Saved.updateMany(
                { resume_id: resume_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Resume Saved soft deleted by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Resume_Saved_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Resume_Saved.updateMany(
                { resume_id: resume_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Resume Saved restored by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Resume_Saved_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Resume_Saved.deleteMany({ resume_id: resume_id });
    
            return res.status(200).json({
                message: 'Resume Saved permanently deleted by resume_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new resume_saved_Controller