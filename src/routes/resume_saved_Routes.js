const resume_saved_Controller = require('../app/controllers/resume_saved_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-resume-saved-list', 
    resume_saved_Controller.get_All_Resume_Saved
)
router.post(
    '/add-resume-saved', 
    resume_saved_Controller.add_Resume_Saved
)
router.post(
    '/soft-delete-resume-saved', 
    resume_saved_Controller.soft_Delete_Resume_Saved
)
router.post(
    '/delete-resume-saved', 
    resume_saved_Controller.perma_Delete_Resume_Saved
)
router.post(
    '/restore-resume-saved', 
    resume_saved_Controller.restore_Deleted_Resume_Saved
)
router.post(
    '/soft-delete-resume-saved-by-resume', 
    resume_saved_Controller.soft_Delete_Resume_Saved_By_Resume
)
router.post(
    '/delete-resume-saved-by-resume', 
    resume_saved_Controller.perma_Delete_Resume_Saved_By_Resume
)
router.post(
    '/restore-resume-saved-by-resume', 
    resume_saved_Controller.restore_Deleted_Resume_Saved_By_Resume
)
router.post(
    '/get-resume-saved/:id', 
    resume_saved_Controller.get_Resume_Saved
)
router.post(
    '/get-all-resume-saved-by-email', 
    resume_saved_Controller.get_all_Resume_Saved_By_User
)
router.post(
    '/get-specific-resume-saved', 
    resume_saved_Controller.get_Specific_Resume_Saved
)


module.exports = router