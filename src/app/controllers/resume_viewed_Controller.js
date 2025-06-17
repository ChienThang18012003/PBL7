const Resume_Viewed = require('../models/Resume_Viewed')
const User1 = require('../models/User1')
const Resume = require('../models/Resume')
const Company = require('../models/Company')


class resume_viewed_Controller{
    add_Resume_Viewed = async(req, res) =>{
        try{
            const {email, user_id} = req.body

            const viewer = await User1.findOne({email:email})
            if (!viewer) {
                return res.status(404).json({error: 'Viewer not found'})
            }

            const company = await Company.findOne({user_id: viewer?._id});

            const user = await User1.findOne({_id: user_id}, {_id: 1})
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

            const createdResumeViewed = await Resume_Viewed.create({
                viewer_id: viewer._id,
                user_id: user?._id,
                company_id: company?._id
            });
    
            // Populate the created post
            const resumeViewed = await Resume_Viewed.findById(createdResumeViewed._id)
                .populate('viewer_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(resumeViewed)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Resume_Viewed = async(req, res) =>{
        try{
            const resume_viewed_id = req.params.id

            const viewedResume = await Resume_Viewed.findById(resume_viewed_id)
                .populate('viewer_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(viewedResume)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Resume_Viewed_By_User = async(req, res) =>{
        try{
            const {email} = req.body

            const user = await User1.findOne({email: email, is_deleted: false})

            if (!user) {
                return res.status(404).json({message: 'User not found' })
            }
            
            const resumeViewed = await Resume_Viewed.find({user_id: user?._id})
            .populate('user_id')
            .populate('viewer_id')
            .populate('company_id','_id company_name');

            return res.status(200).json(resumeViewed )
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Specific_Resume_Viewed = async(req, res) =>{
        try{
            const {user_id, email} = req.body

            const user = await User1.findOne({email: email});

            const resume = await Resume_Viewed.findOne({user_id: user_id, viewer_id: user?._id})
                .populate('user_id', 'email username phone')
                .populate('viewer_id')

            return res.status(200).json(resume);
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Resume_Viewed = async(req, res) =>{
        try{
            
            const resumeViewed = await Resume_Viewed.find()
                .populate('viewer_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(resumeViewed)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Resume_Viewed = async (req, res) => {
        try {
            // get id list
            const { resume_viewed_Ids } = req.body

            // if no ids
            if (
                !resume_viewed_Ids ||
                !Array.isArray(resume_viewed_Ids) ||
                resume_viewed_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Resume_Viewed.updateMany(
            {_id: {$in: resume_viewed_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Resume Viewed soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Resume_Viewed = async (req, res) => {
        try {
            // get id list
            const { resume_viewed_Ids } = req.body

            // if no ids
            if (
                !resume_viewed_Ids ||
                !Array.isArray(resume_viewed_Ids) ||
                resume_viewed_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Resume_Viewed.updateMany(
                {_id: { $in: resume_viewed_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Resume Viewed restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Resume_Viewed = async (req, res) => {
        try {
            // get id list
            const {resume_viewed_Ids} = req.body

            // if no ids
            if (
                !resume_viewed_Ids ||
                !Array.isArray(resume_viewed_Ids) ||
                resume_viewed_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Resume_Viewed.deleteMany({_id: {$in: resume_viewed_Ids}})

            return res.status(200).json({
                message: 'Resume Viewed deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Resume_Viewed_By_Resume = async (req, res) => {
        try {
            const { viewer_id } = req.body;
    
            if (!viewer_id) {
                return res.status(400).json({ error: "No viewer_id provided" });
            }

            const result = await Resume_Viewed.updateMany(
                { viewer_id: viewer_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Resume Viewed soft deleted by viewer_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Resume_Viewed_By_Resume = async (req, res) => {
        try {
            const { viewer_id } = req.body;
    
            if (!viewer_id) {
                return res.status(400).json({ error: "No viewer_id provided" });
            }
    
            const result = await Resume_Viewed.updateMany(
                { viewer_id: viewer_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Resume Viewed restored by viewer_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Resume_Viewed_By_Resume = async (req, res) => {
        try {
            const { viewer_id } = req.body;
    
            if (!viewer_id) {
                return res.status(400).json({ error: "No viewer_id provided" });
            }
    
            const result = await Resume_Viewed.deleteMany({ viewer_id: viewer_id });
    
            return res.status(200).json({
                message: 'Resume Viewed permanently deleted by viewer_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new resume_viewed_Controller