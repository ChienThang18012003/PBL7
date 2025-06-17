const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Job_Post = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    career_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Career', 
        required: true 
    },
    company_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true 
    },
    location_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    job_name: {
        type: String,
        default: ''
    },
    deadline: { 
        type: Date, 
        default: Date.now
    },
    quantity: { 
        type: Number, 
        default: 1
    },
    status: { 
        type: String, 
        default: "Chờ duyệt"
    },
    view: { 
        type: Number, 
        default: 0
    },
    position: { 
        type: String, 
        required: true
    },
    type_of_workplace: { 
        type: String, 
        required: true
    },
    experience: { 
        type: String, 
        required: true
    },
    academic_level: { 
        type: String, 
        required: true
    },
    job_type: { 
        type: String, 
        required: true
    },
    salary_min: { 
        type: Number, 
        default: 0
    },
    salary_max: { 
        type: Number, 
        default: 0
    },
    job_description: { 
        type: String, 
    },
    job_requirement: { 
        type: String, 
    },
    gender_required: { 
        type: String
    },
    contact_person_name: { 
        type: String, 
        required: true 
    },
    contact_person_phone: { 
        type: String, 
        required: true 
    },
    contact_person_email: { 
        type: String, 
        required: true 
    },
    benefit_enjoyed: { 
        type: String
    },
    is_urgent: {
        type: Boolean, 
        default: false 
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
})

module.exports = mongoose.model('Job_Post', Job_Post)