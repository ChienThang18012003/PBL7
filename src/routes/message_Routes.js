const message_Controller = require('../app/controllers/message_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/add-message', 
    message_Controller.add_Message
)

router.post(
    '/get-message-between-users', 
    message_Controller.get_Messages_Between_Users
)

router.post(
    '/get-new-message', 
    message_Controller.get_New_Messages_LongPolling
)


module.exports = router