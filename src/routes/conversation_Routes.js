const conversation_Controller = require('../app/controllers/conversation_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/add-conversation', 
    conversation_Controller.add_Conversation
)

router.post(
    '/get-conversation-by-email', 
    conversation_Controller.get_Conversations_By_Email
)


module.exports = router