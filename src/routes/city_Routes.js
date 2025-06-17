const city_Controller = require('../app/controllers/city_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-city-list', 
    city_Controller.get_City_List
)
router.post(
    '/add-city', 
    city_Controller.add_City
)
router.get(
    '/fetch-vn-location', 
    city_Controller.fetchVNLocation
)
router.post(
    '/update-city/:id', 
    city_Controller.update_City
)
router.post(
    '/soft-delete-city', 
    city_Controller.soft_Delete_City
)
router.post(
    '/delete-city', 
    city_Controller.perma_Delete_City
)
router.post(
    '/restore-city', 
    city_Controller.restore_Deleted_City
)
router.post(
    '/get-city', 
    city_Controller.get_City
)


module.exports = router