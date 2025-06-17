const user_Search_Preference_Controller = require('../app/controllers/user_Search_Preference_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/add-user-search', 
    user_Search_Preference_Controller.add_User_Search
)

module.exports = router