const company_followed_Controller = require('../app/controllers/company_followed_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-company-followed-list', 
    company_followed_Controller.get_All_Company_Followed
)
router.post(
    '/add-company-followed', 
    company_followed_Controller.add_Company_Followed
)
router.post(
    '/soft-delete-company-followed', 
    company_followed_Controller.soft_Delete_Company_Followed
)
router.post(
    '/delete-company-followed', 
    company_followed_Controller.perma_Delete_Company_Followed
)
router.post(
    '/restore-company-followed', 
    company_followed_Controller.restore_Deleted_Company_Followed
)
router.post(
    '/soft-delete-company-followed-by-user', 
    company_followed_Controller.soft_Delete_Company_Followed_By_User
)
router.post(
    '/delete-company-followed-by-user', 
    company_followed_Controller.perma_Delete_Company_Followed_By_User
)
router.post(
    '/restore-company-followed-by-user', 
    company_followed_Controller.restore_Deleted_Company_Followed_By_User
)
router.post(
    '/get-company-followed/:id', 
    company_followed_Controller.get_Company_Followed
)
router.post(
    '/get-all-company-followed-by-user', 
    company_followed_Controller.get_all_Company_Followed_By_User
)
router.post(
    '/get-specific-company-followed',
    company_followed_Controller.get_Specific_Company_Followed
)


module.exports = router