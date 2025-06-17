const banner_Controller = require('../app/controllers/banner_Controller')
const require_Auth = require('../middleware/require_Auth')
const {upload_image} = require('../middleware/multer')

const express = require('express')
const router = express.Router()

router.post(
    '/add-banner', 
    upload_image.single('banner_image'), 
    banner_Controller.add_Banner
)
router.get(
    '/get-banner/:id', 
    banner_Controller.get_Banner
)
router.post(
    '/get-all-banner', 
    banner_Controller.get_All_Banner
)
router.post(
    '/get-all-banner-by-email', 
    banner_Controller.get_all_Banner_By_Email
)
router.post(
    '/get-all-banner-by-type', 
    banner_Controller.get_all_Banner_By_Type
)
router.post(
    '/update-banner/:id',
    upload_image.single('banner_image'),  
    banner_Controller.update_Banner
)
router.post(
    '/soft-del-banner', 
    banner_Controller.soft_Delete_Banner
)
router.post(
    '/restore-banner', 
    banner_Controller.restore_Banner
)
router.post(
    '/perma-del-banner', 
    banner_Controller.perma_Delete_Banner
)
router.post(
    '/soft-del-banner-by-user', 
    banner_Controller.soft_Delete_Banner_By_UserID
)
router.post(
    '/restore-banner-by-user', 
    banner_Controller.restore_Deleted_Banner_By_UserId
)
router.post(
    '/perma-del-banner-by-user', 
    banner_Controller.perma_Delete_Banner_By_UserId
)



module.exports = router