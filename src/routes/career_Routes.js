const career_Controller = require('../app/controllers/career_Controller')
const {upload_image} = require('../middleware/multer')

const express = require('express')
const router = express.Router()

router.post(
    '/get-career-list', 
    career_Controller.get_Career_List
)
router.get(
    '/get-career/:id', 
    career_Controller.get_Career_By_ID
)
router.post(
    '/add-career',
    upload_image.single('career_logo'), 
    career_Controller.add_Career
)
router.post(
    '/update-career/:id', 
    upload_image.single('career_logo'),  
    career_Controller.update_Career
)
router.post(
    '/soft-delete-career',
    career_Controller.soft_Delete_Career
)
router.post(
    '/delete-career', 
    career_Controller.perma_Delete_Career
)
router.post(
    '/restore-career',
    career_Controller.restore_Deleted_Career
)
router.post(
    '/statistic-top5-career-by-job-post',
    career_Controller.statistic_Top5_Career_By_Job_Post
)
router.post(
    '/statistic-top8-career-by-job-post',
    career_Controller.statistic_Top8_Career_By_Job_Post
)
module.exports = router