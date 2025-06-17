const district_Controller = require('../app/controllers/district_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-district-list', 
    district_Controller.get_All_District
)
router.post(
    '/add-district', 
    district_Controller.add_District
)
router.post(
    '/update-district/:id', 
    district_Controller.update_District
)
router.post(
    '/soft-delete-district', 
    district_Controller.soft_Delete_District
)
router.post(
    '/delete-district', 
    district_Controller.perma_Delete_District
)
router.post(
    '/restore-district', 
    district_Controller.restore_Deleted_District
)
router.post(
    '/get-district/:id', 
    district_Controller.get_District
)
router.post(
    '/get-district-by-city', 
    district_Controller.get_all_District_By_City
)


module.exports = router