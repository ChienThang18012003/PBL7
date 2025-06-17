const location_Controller = require('../app/controllers/location_Controller')
const { upload_image } = require("../middleware/multer");
const express = require('express')
const router = express.Router()

router.post(
    '/get-location-list', 
    location_Controller.get_All_Location
)
router.post(
    '/add-location', 
    upload_image.none(),
    location_Controller.add_Location
)
router.post(
    '/update-location/:id', 
    location_Controller.update_Location
)
router.post(
    '/soft-delete-location', 
    location_Controller.soft_Delete_Location
)
router.post(
    '/delete-location', 
    location_Controller.perma_Delete_Location
)
router.post(
    '/restore-location', 
    location_Controller.restore_Deleted_Location
)
router.post(
    '/get-location/:id', 
    location_Controller.get_Location
)


module.exports = router