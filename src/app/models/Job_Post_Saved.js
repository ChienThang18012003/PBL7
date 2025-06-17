
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Job_Post_Saved = new Schema({
    job_post_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job_Post', 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    date_saved: { 
        type: Date, 
        default: Date.now
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Job_Post_Saved', Job_Post_Saved)