const language_skill_Controller = require('../app/controllers/language_skill_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-language-skill-list', 
    language_skill_Controller.get_All_Language_Skill
)
router.post(
    '/add-language-skill', 
    language_skill_Controller.add_Language_Skill
)
router.post(
    '/update-language-skill/:id', 
    language_skill_Controller.update_Language_Skill
)
router.post(
    '/soft-delete-language-skill', 
    language_skill_Controller.soft_Delete_Language_Skill
)
router.post(
    '/delete-language-skill', 
    language_skill_Controller.perma_Delete_Language_Skill
)
router.post(
    '/restore-language-skill', 
    language_skill_Controller.restore_Deleted_Language_Skill
)
router.post(
    '/soft-delete-language-skill-by-resume', 
    language_skill_Controller.soft_Delete_Language_Skill_By_Resume
)
router.post(
    '/delete-language-skill-by-resume', 
    language_skill_Controller.perma_Delete_Language_Skill_By_Resume
)
router.post(
    '/restore-language-skill-by-resume', 
    language_skill_Controller.restore_Deleted_Language_Skill_By_Resume
)
router.post(
    '/get-language-skill/:id', 
    language_skill_Controller.get_Language_Skill
)
router.post(
    '/get-all-language-skill-by-resume', 
    language_skill_Controller.get_all_Language_Skill_By_Resume
)


module.exports = router