const experience_detail_Controller = require('../app/controllers/experience_detail_Controller')
const express = require('express')
const router = express.Router()

router.post(
    '/get-experience-detail-list', 
    experience_detail_Controller.get_All_Experience_Detail
)
router.post(
    '/add-experience-detail', 
    experience_detail_Controller.add_Experience_Detail
)
router.post(
    '/update-experience-detail/:id', 
    experience_detail_Controller.update_Experience_Detail
)
router.post(
    '/soft-delete-experience-detail', 
    experience_detail_Controller.soft_Delete_Experience_Detail
)
router.post(
    '/delete-experience-detail', 
    experience_detail_Controller.perma_Delete_Experience_Detail
)
router.post(
    '/restore-experience-detail', 
    experience_detail_Controller.restore_Deleted_Experience_Detail
)
router.post(
    '/soft-delete-experience-detail-by-resume', 
    experience_detail_Controller.soft_Delete_Experience_Detail_By_Resume
)
router.post(
    '/delete-experience-detail-by-resume', 
    experience_detail_Controller.perma_Delete_Experience_Detail_By_Resume
)
router.post(
    '/restore-experience-detail-by-resume', 
    experience_detail_Controller.restore_Deleted_Experience_Detail_By_Resume
)
router.post(
    '/get-experience-detail/:id', 
    experience_detail_Controller.get_Experience_Detail
)
router.post(
    '/get-all-experience-detail-by-resume', 
    experience_detail_Controller.get_all_Experience_Detail_By_Resume
)


module.exports = router