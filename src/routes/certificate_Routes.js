const certificate_Controller = require('../app/controllers/certificate_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-certificate-list', 
    certificate_Controller.get_All_Certificate
)
router.post(
    '/add-certificate', 
    certificate_Controller.add_Certificate
)
router.post(
    '/update-certificate/:id', 
    certificate_Controller.update_Certificate
)
router.post(
    '/soft-delete-certificate', 
    certificate_Controller.soft_Delete_Certificate
)
router.post(
    '/delete-certificate', 
    certificate_Controller.perma_Delete_Certificate
)
router.post(
    '/restore-certificate', 
    certificate_Controller.restore_Deleted_Certificate
)
router.post(
    '/soft-delete-certificate-by-resume', 
    certificate_Controller.soft_Delete_Certificate_By_Resume
)
router.post(
    '/delete-certificate-by-resume', 
    certificate_Controller.perma_Delete_Certificate_By_Resume
)
router.post(
    '/restore-certificate-by-resume', 
    certificate_Controller.restore_Deleted_Certificate_By_Resume
)
router.post(
    '/get-certificate/:id', 
    certificate_Controller.get_Certificate
)
router.post(
    '/get-all-certificate-by-resume', 
    certificate_Controller.get_all_Certificate_By_Resume
)


module.exports = router