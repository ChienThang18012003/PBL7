const Job_Post_Saved = require('../models/Job_Post_Saved')
const User1 = require('../models/User1')
const Job_Post = require('../models/Job_Post')


class job_post_saved_Controller{
    add_Job_Post_Saved = async(req, res) =>{
        try{
            const {job_post_id, email} = req.body


            const job_post = await Job_Post.findOne({_id: job_post_id}, {_id: 1})
            if (!job_post) {
                return res.status(404).json({error: 'job post not found'})
            }

            const user = await User1.findOne({email:email})
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

            const createdJobPostSaved = await Job_Post_Saved.create({
                job_post_id: job_post._id,
                user_id: user?._id
            });
    
            // Populate the created post
            const jobPostSaved = await Job_Post_Saved.findById(createdJobPostSaved._id)
                .populate('job_post_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(jobPostSaved)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Job_Post_Saved = async(req, res) =>{
        try{
            const job_post_saved_id = req.params.id

            const savedJobPost = await Job_Post_Saved.findById(job_post_saved_id)
                .populate('job_post_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(savedJobPost)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Job_Post_Saved_By_User = async(req, res) =>{
        try{
            const {email} = req.body

            const user = await User1.findOne({email:email});
            
            const resumeSaved = await Job_Post_Saved.find({ user_id: user?._id, is_deleted: false })
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
            });

            return res.status(200).json(resumeSaved )
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Specific_Job_Post_Saved = async(req, res) =>{
        try{
            const {job_post_id, email} = req.body

            const user = await User1.findOne({email: email});

            const jobPost = await Job_Post_Saved.findOne({job_post_id: job_post_id, user_id: user?._id})
                .populate('job_post_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(jobPost)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Job_Post_Saved = async(req, res) =>{
        try{
            
            const jobPostSaved = await Job_Post_Saved.find()
                .populate('job_post_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(jobPostSaved)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Job_Post_Saved = async (req, res) => {
        try {
            // get id list
            const { job_post_saved_Ids } = req.body

            // if no ids
            if (
                !job_post_saved_Ids ||
                !Array.isArray(job_post_saved_Ids) ||
                job_post_saved_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Job_Post_Saved.updateMany(
            {_id: {$in: job_post_saved_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Job Post Saved soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Job_Post_Saved = async (req, res) => {
        try {
            // get id list
            const { job_post_saved_Ids } = req.body

            // if no ids
            if (
                !job_post_saved_Ids ||
                !Array.isArray(job_post_saved_Ids) ||
                job_post_saved_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Job_Post_Saved.updateMany(
                {_id: { $in: job_post_saved_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Job Post Saved restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Job_Post_Saved = async (req, res) => {
        try {
            // get id list
            const {job_post_saved_Ids} = req.body
            console.log(job_post_saved_Ids);

            // if no ids
            if (
                !job_post_saved_Ids ||
                !Array.isArray(job_post_saved_Ids) ||
                job_post_saved_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Job_Post_Saved.deleteMany({_id: {$in: job_post_saved_Ids}})

            return res.status(200).json({
                message: 'Job Post Saved deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Job_Post_Saved_By_Job_Post = async (req, res) => {
        try {
            const { job_post_id } = req.body;
    
            if (!job_post_id) {
                return res.status(400).json({ error: "No job_post_id provided" });
            }

            const result = await Job_Post_Saved.updateMany(
                { job_post_id: job_post_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Job Post Saved soft deleted by job_post_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Job_Post_Saved_By_Job_Post = async (req, res) => {
        try {
            const { job_post_id } = req.body;
    
            if (!job_post_id) {
                return res.status(400).json({ error: "No job_post_id provided" });
            }
    
            const result = await Job_Post_Saved.updateMany(
                { job_post_id: job_post_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Job Post Saved restored by job_post_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Job_Post_Saved_By_Job_Post = async (req, res) => {
        try {
            const { job_post_id } = req.body;
    
            if (!job_post_id) {
                return res.status(400).json({ error: "No job_post_id provided" });
            }
    
            const result = await Job_Post_Saved.deleteMany({ job_post_id: job_post_id });
    
            return res.status(200).json({
                message: 'Job Post Saved permanently deleted by job_post_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new job_post_saved_Controller