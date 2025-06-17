const advance_skill_Controller = require('../app/controllers/advance_skill_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-advance-skill-list', 
    advance_skill_Controller.get_All_Advance_Skill
)
router.post(
    '/add-advance-skill', 
    advance_skill_Controller.add_Advance_Skill
)
router.post(
    '/update-advance-skill/:id', 
    advance_skill_Controller.update_Advance_Skill
)
router.post(
    '/soft-delete-advance-skill', 
    advance_skill_Controller.soft_Delete_Advance_Skill
)
router.post(
    '/delete-advance-skill', 
    advance_skill_Controller.perma_Delete_Advance_Skill
)
router.post(
    '/restore-advance-skill', 
    advance_skill_Controller.restore_Deleted_Advance_Skill
)
router.post(
    '/soft-delete-advance-skill-by-resume', 
    advance_skill_Controller.soft_Delete_Advance_Skill_By_Resume
)
router.post(
    '/delete-advance-skill-by-resume', 
    advance_skill_Controller.perma_Delete_Advance_Skill_By_Resume
)
router.post(
    '/restore-advance-skill-by-resume', 
    advance_skill_Controller.restore_Deleted_Advance_Skill_By_Resume
)
router.post(
    '/get-advance-skill/:id', 
    advance_skill_Controller.get_Advance_Skill
)
router.post(
    '/get-all-advance-skill-by-resume', 
    advance_skill_Controller.get_all_Advance_Skill_By_Resume
)


module.exports = router