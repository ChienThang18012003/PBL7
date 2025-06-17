const job_post_saved_Controller = require('../app/controllers/job_post_saved_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-job-post-saved-list', 
    job_post_saved_Controller.get_All_Job_Post_Saved
)
router.post(
    '/add-job-post-saved', 
    job_post_saved_Controller.add_Job_Post_Saved
)
router.post(
    '/soft-delete-job-post-saved', 
    job_post_saved_Controller.soft_Delete_Job_Post_Saved
)
router.post(
    '/delete-job-post-saved', 
    job_post_saved_Controller.perma_Delete_Job_Post_Saved
)
router.post(
    '/restore-job-post-saved', 
    job_post_saved_Controller.restore_Deleted_Job_Post_Saved
)
router.post(
    '/soft-delete-job-post-saved-by-job-post', 
    job_post_saved_Controller.soft_Delete_Job_Post_Saved_By_Job_Post
)
router.post(
    '/delete-job-post-saved-by-job-post', 
    job_post_saved_Controller.perma_Delete_Job_Post_Saved_By_Job_Post
)
router.post(
    '/restore-job-post-saved-by-job-post', 
    job_post_saved_Controller.restore_Deleted_Job_Post_Saved_By_Job_Post
)
router.post(
    '/get-job-post-saved/:id', 
    job_post_saved_Controller.get_Job_Post_Saved
)
router.post(
    '/get-all-job-post-saved-by-user', 
    job_post_saved_Controller.get_all_Job_Post_Saved_By_User
)
router.post(
    '/get-specific-job-post-saved', 
    job_post_saved_Controller.get_Specific_Job_Post_Saved
)


module.exports = router