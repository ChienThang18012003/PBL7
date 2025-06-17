const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Resume = Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    desired_position: { 
        type: String, 
        default: ""
    },
    desired_job_level: { 
        type: String, 
        default: ""
    },
    experience: { 
        type: String, 
        default: ""
    },
    academic_level: { 
        type: String, 
        default: ""
    },
    type_of_workplace: { 
        type: String, 
        default: ""
    },
    job_type: { 
        type: String, 
        default: ""
    },
    career_goal: { 
        type: String, 
        default: ""
    },
    salary_min: { 
        type: Number, 
    },
    salary_max: { 
        type: Number, 
    },
    city_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City', 
    },
    career_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Career', 
    },
    attached_file: {
        type: String,
        required: false
    },
    is_default: { 
        type: Boolean, 
        default: false 
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })


module.exports = mongoose.model('Resume', Resume)