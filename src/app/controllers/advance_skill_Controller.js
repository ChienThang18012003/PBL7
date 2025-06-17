const Advance_Skill = require('../models/Advance_Skill')
const Resume = require('../models/Resume')


class advance_skill_Controller{
    add_Advance_Skill = async(req, res) =>{
        try{
            const {resume_id, name, level} = req.body

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

            const createdAdvanceSkill = await Advance_Skill.create({
                resume_id: resume._id,
                name,
                level
            });
    
            // Populate the created post
            const advanceSkill = await Advance_Skill.findById(createdAdvanceSkill._id)
                .populate('resume_id')

            return res.status(200).json(advanceSkill)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Advance_Skill = async(req, res) =>{
        try{
            const advance_skill_id = req.params.id

            const advance = await Advance_Skill.findById(advance_skill_id)
                .populate('resume_id')

            return res.status(200).json(advance)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Advance_Skill_By_Resume = async(req, res) =>{
        try{
            const {resume_id} = req.body
            
            const advances = await Advance_Skill.find({resume_id: resume_id})

            return res.status(200).json(advances)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Advance_Skill = async(req, res) =>{
        try{
            
            const advances = await Advance_Skill.find()
                .populate('resume_id')

            return res.status(200).json(advances)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Advance_Skill = async(req, res) =>{
        try{
            const advance_skill_id = req.params.id
            const {resume_id, name, level} = req.body

            const query = {name, level}

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})

            if(resume){
                query.resume_id = resume._id
            }

            let advance_skill = await Advance_Skill.findByIdAndUpdate(
                advance_skill_id,
                query,
                {new: true}
            )
            .populate('resume_id')

            if (!advance_skill) {
                return res.status(404).json({error: 'Advance Skill not found'})
            }

            return res.status(200).json(advance_skill)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Advance_Skill = async (req, res) => {
        try {
            // get id list
            const { advance_skill_Ids } = req.body

            // if no ids
            if (
                !advance_skill_Ids ||
                !Array.isArray(advance_skill_Ids) ||
                advance_skill_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Advance_Skill.updateMany(
            {_id: {$in: advance_skill_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Advance Skill soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Advance_Skill = async (req, res) => {
        try {
            // get id list
            const { advance_skill_Ids } = req.body

            // if no ids
            if (
                !advance_skill_Ids ||
                !Array.isArray(advance_skill_Ids) ||
                advance_skill_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Advance_Skill.updateMany(
                {_id: { $in: advance_skill_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Advance Skill restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Advance_Skill = async (req, res) => {
        try {
            // get id list
            const {advance_skill_Ids} = req.body

            // if no ids
            if (
                !advance_skill_Ids ||
                !Array.isArray(advance_skill_Ids) ||
                advance_skill_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Advance_Skill.deleteMany({_id: {$in: advance_skill_Ids}})

            return res.status(200).json({
                message: 'Advance Skill deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Advance_Skill_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }

            const result = await Advance_Skill.updateMany(
                { resume_id: resume_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Advance Skill soft deleted by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Advance_Skill_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Advance_Skill.updateMany(
                { resume_id: resume_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Advance Skill restored by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Advance_Skill_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Advance_Skill.deleteMany({ resume_id: resume_id });
    
            return res.status(200).json({
                message: 'Advance Skill permanently deleted by resume_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new advance_skill_Controller