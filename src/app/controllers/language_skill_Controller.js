const Language_Skill = require('../models/Language_Skill')
const Resume = require('../models/Resume')


class language_skill_Controller{
    add_Language_Skill = async(req, res) =>{
        try{
            const {resume_id, language, level} = req.body

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

            const createdLanguageSkill = await Language_Skill.create({
                resume_id: resume._id,
                language,
                level
            });
    
            // Populate the created post
            const languageSkill = await Language_Skill.findById(createdLanguageSkill._id)
                .populate('resume_id')

            return res.status(200).json(languageSkill)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Language_Skill = async(req, res) =>{
        try{
            const language_skill_id = req.params.id

            const language = await Language_Skill.findById(language_skill_id)
                .populate('resume_id')

            return res.status(200).json(language)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Language_Skill_By_Resume = async(req, res) =>{
        try{
            const {resume_id} = req.body
            
            const languages = await Language_Skill.find({resume_id: resume_id})

            return res.status(200).json(languages)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Language_Skill = async(req, res) =>{
        try{
            
            const languages = await Language_Skill.find()
                .populate('resume_id')

            return res.status(200).json(languages)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Language_Skill = async(req, res) =>{
        try{
            const language_skill_id = req.params.id
            const {resume_id, language, level} = req.body

            const query = {language, level}

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})

            if(resume){
                query.resume_id = resume._id
            }

            let language_skill = await Language_Skill.findByIdAndUpdate(
                language_skill_id,
                query,
                {new: true}
            )
            .populate('resume_id')

            if (!language_skill) {
                return res.status(404).json({error: 'Language Skill not found'})
            }

            return res.status(200).json(language_skill)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Language_Skill = async (req, res) => {
        try {
            // get id list
            const { language_skill_Ids } = req.body

            // if no ids
            if (
                !language_skill_Ids ||
                !Array.isArray(language_skill_Ids) ||
                language_skill_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Language_Skill.updateMany(
            {_id: {$in: language_skill_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Language Skill soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Language_Skill = async (req, res) => {
        try {
            // get id list
            const { language_skill_Ids } = req.body

            // if no ids
            if (
                !language_skill_Ids ||
                !Array.isArray(language_skill_Ids) ||
                language_skill_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Language_Skill.updateMany(
                {_id: { $in: language_skill_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Language Skill restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Language_Skill = async (req, res) => {
        try {
            // get id list
            const {language_skill_Ids} = req.body

            // if no ids
            if (
                !language_skill_Ids ||
                !Array.isArray(language_skill_Ids) ||
                language_skill_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Language_Skill.deleteMany({_id: {$in: language_skill_Ids}})

            return res.status(200).json({
                message: 'Language Skill deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Language_Skill_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }

            const result = await Language_Skill.updateMany(
                { resume_id: resume_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Language Skill soft deleted by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Language_Skill_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Language_Skill.updateMany(
                { resume_id: resume_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Language Skill restored by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Language_Skill_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Language_Skill.deleteMany({ resume_id: resume_id });
    
            return res.status(200).json({
                message: 'Language Skill permanently deleted by resume_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new language_skill_Controller