const user_Controller = require('../app/controllers/user_Controller')
const require_Auth = require('../middleware/require_Auth')

const express = require('express')
const router = express.Router()
const { upload_image, uploadPDF } = require("../middleware/multer")

router.post(
    '/login', 
    user_Controller.acc_Login)
router.post(
    "/signup", 
    user_Controller.acc_Signup)
router.post(
    '/acc-list', 
    user_Controller.get_Account_List
)
router.post(
    '/get-acc-mail', 
    user_Controller.get_Account_By_Mail
)
router.post(
    '/get-acc/:id', 
    user_Controller.get_Account_By_Id
)
router.post(
    '/update-acc-info/:id', 
    upload_image.single('profile_image'), 
    user_Controller.update_Acc_Info
)
router.post(
    "/get-acc-status", 
    user_Controller.get_Account_Status
);
router.post(
    '/soft-delete-acc', 
    user_Controller.soft_Delete_Account
)
router.post(
    '/perma-delete-acc', 
    user_Controller.perma_Delete_Account
)
router.post(
    '/restore-acc', 
    user_Controller.restore_Deleted_Account
)
router.post(
    '/change-pass', 
    user_Controller.change_password
)

router.post(
    '/change-acc-role', 
    user_Controller.change_Account_Role
)

router.post(
    '/update-account-status/:id', 
    user_Controller.update_Account_Status
)
router.post(
    '/get-all-account', 
    user_Controller.get_All_Account
)
router.post(
    '/forgot-pass', 
    user_Controller.forgot_password
)
router.get(
    '/reset-password/:token', 
    user_Controller.reset_password
)
router.get(
    "/confirm-acc/:token", 
    user_Controller.confirm_Account
);
router.post(
    "/count-users-by-role", 
    user_Controller.count_Users_By_Role
);
router.post(
    "/statistic-users-by-date", 
    user_Controller.statistic_Users_By_Date
);
router.post(
    "/send-email", 
    user_Controller.send_Email
);

module.exports = router
