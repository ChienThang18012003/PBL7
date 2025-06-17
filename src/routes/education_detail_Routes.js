const education_detail_Controller = require('../app/controllers/education_detail_Controller')
const express = require('express')
const router = express.Router()

router.post(
    '/get-education-detail-list', 
    education_detail_Controller.get_All_Education_Detail
)
router.post(
    '/add-education-detail', 
    education_detail_Controller.add_Education_Detail
)
router.post(
    '/update-education-detail/:id', 
    education_detail_Controller.update_Education_Detail
)
router.post(
    '/soft-delete-education-detail', 
    education_detail_Controller.soft_Delete_Education_Detail
)
router.post(
    '/delete-education-detail', 
    education_detail_Controller.perma_Delete_Education_Detail
)
router.post(
    '/restore-education-detail', 
    education_detail_Controller.restore_Deleted_Education_Detail
)
router.post(
    '/soft-delete-education-detail-by-resume', 
    education_detail_Controller.soft_Delete_Education_Detail_By_Resume
)
router.post(
    '/delete-education-detail-by-resume', 
    education_detail_Controller.perma_Delete_Education_Detail_By_Resume
)
router.post(
    '/restore-education-detail-by-resume', 
    education_detail_Controller.restore_Deleted_Education_Detail_By_Resume
)
router.post(
    '/get-education-detail/:id', 
    education_detail_Controller.get_Education_Detail
)
router.post(
    '/get-all-education-detail-by-resume', 
    education_detail_Controller.get_all_Education_Detail_By_Resume
)


module.exports = router