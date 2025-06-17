const company_Controller = require('../app/controllers/company_Controller')
const { upload_image } = require("../middleware/multer");
const parseFormJsonFields = require('../middleware/parseFormJsonFields');
const express = require('express')
const router = express.Router()

router.post(
    '/get-company-list', 
    company_Controller.get_Company_List
)
router.get(
    '/get-company/:id', 
    company_Controller.get_Company
)
router.post(
    '/get-company-id-by-email', 
    company_Controller.get_Company_Id_By_Email
)
router.post(
    '/get-company-by-email', 
    company_Controller.get_Company_By_Email
)
router.post(
    '/filter-company', 
    company_Controller.filterCompany
)
router.post(
    '/update-company/:id',
    upload_image.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'cover_image', maxCount: 1 },
      { name: 'multi_media', maxCount: 10 },
    ]),
    parseFormJsonFields(['delete_images']), // 👈 Parse delete_images nếu là chuỗi
    company_Controller.update_Company
  );

  router.post(
    '/add-company',
    upload_image.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'cover_image', maxCount: 1 },
      { name: 'multi_media', maxCount: 10 },
    ]),
    company_Controller.add_Company
  );
  
router.post(
    '/soft-delete-company', 
    company_Controller.soft_Delete_Company
)
router.post(
    '/delete-company/:id', 
    company_Controller.delete_Company
)
router.post(
    '/restore-company', 
    company_Controller.restore_Deleted_Company
)
router.post(
    '/soft-delete-company-by-user', 
    company_Controller.soft_Delete_Company_By_User
)
router.post(
    '/delete-company-by-user/:id', 
    company_Controller.delete_Company_By_User
)
router.post(
    '/restore-company-by-user', 
    company_Controller.restore_Deleted_Company_By_User
)
router.post(
    '/statistic-top5-company', 
    company_Controller.statistic_Top5_Company_With_Most_Approved_JobPosts
)
module.exports = router