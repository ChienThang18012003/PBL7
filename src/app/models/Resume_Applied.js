
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Resume_Applied = new Schema({
    resume_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resume', 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    job_post_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job_Post', 
        required: true 
    },
    employer_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    date_applied: { 
        type: Date, 
        default: Date.now
    },
    status: { 
        type: String, 
        default: "Chờ xác nhận"
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Resume_Applied', Resume_Applied)