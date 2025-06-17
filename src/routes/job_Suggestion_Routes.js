const job_Suggestion_Controller = require('../app/controllers/job_Suggestion_Controller')

const express = require('express')
const router = express.Router()

router.post(
    '/suggest-job', 
    job_Suggestion_Controller.suggest_Job_Post
)

router.post(
    '/extract-intent', 
    job_Suggestion_Controller.extractIntent
)

module.exports = router