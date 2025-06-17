
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Experience_Detail = new Schema({
    resume_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resume', 
        required: true 
    },
    job_name: { 
        type: String, 
        required: true 
    },
    company_name: { 
        type: String, 
        required: true 
    },
    start_date: { 
        type: Date, 
        default: Date.now
    },
    end_date: { 
        type: Date, 
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Experience_Detail', Experience_Detail)