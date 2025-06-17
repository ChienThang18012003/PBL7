const resume_viewed_Controller = require('../app/controllers/resume_viewed_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-resume-viewed-list', 
    resume_viewed_Controller.get_All_Resume_Viewed
)
router.post(
    '/add-resume-viewed', 
    resume_viewed_Controller.add_Resume_Viewed
)
router.post(
    '/soft-delete-resume-viewed', 
    resume_viewed_Controller.soft_Delete_Resume_Viewed
)
router.post(
    '/delete-resume-viewed', 
    resume_viewed_Controller.perma_Delete_Resume_Viewed
)
router.post(
    '/restore-resume-viewed', 
    resume_viewed_Controller.restore_Deleted_Resume_Viewed
)
router.post(
    '/soft-delete-resume-viewed-by-resume', 
    resume_viewed_Controller.soft_Delete_Resume_Viewed_By_Resume
)
router.post(
    '/delete-resume-viewed-by-resume', 
    resume_viewed_Controller.perma_Delete_Resume_Viewed_By_Resume
)
router.post(
    '/restore-resume-viewed-by-resume', 
    resume_viewed_Controller.restore_Deleted_Resume_Viewed_By_Resume
)
router.post(
    '/get-resume-viewed/:id', 
    resume_viewed_Controller.get_Resume_Viewed
)
router.post(
    '/get-all-resume-viewed-by-email', 
    resume_viewed_Controller.get_all_Resume_Viewed_By_User
)
router.post(
    '/get-specific-resume-viewed', 
    resume_viewed_Controller.get_Specific_Resume_Viewed
)


module.exports = router