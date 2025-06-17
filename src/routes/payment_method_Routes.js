const payment_method_Controller = require('../app/controllers/payment_method_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/get-method-list', 
    payment_method_Controller.get_Method_List
)
router.post(
    '/add-method', 
    payment_method_Controller.add_Method
)
router.post(
    '/update-method/:id', 
    payment_method_Controller.update_Method
)
router.post(
    '/soft-delete-method', 
    payment_method_Controller.soft_Delete_Method
)
router.post(
    '/perma-delete-method', 
    payment_method_Controller.perma_Delete_Method
)
router.post(
    '/restore-method', 
    payment_method_Controller.restore_Deleted_Method
)
router.post(
    '/get-method/:id', 
    payment_method_Controller.get_Method
)


module.exports = router