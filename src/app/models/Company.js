const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Company = new Schema({
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
    location_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    company_name: { 
        type: String, 
        required: true 
    },
    company_phone: { 
        type: String, 
        required: true 
    },
    company_email: { 
        type: String, 
        required: true 
    },
    employee_size: { 
        type: String, 
    },
    tax_code: { 
        type: String, 
    },
    description: { 
        type: String, 
        default: ''
    },
    logo: { 
        type: String, 
    },
    cover_image: { 
        type: String, 
    },
    multi_media: [{ 
        image: { 
            type: String, 
            default: null 
        },
    }],
    website_url: { 
        type: String,
        default: "",
    },
    facebook_url: { 
        type: String,
        default: "",
    },
    youtube_url: { 
        type: String,
        default: "",
    },
    linkedin_url: { 
        type: String,
        default: "",
    },
    established_date: { 
        type: Date
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
})

module.exports = mongoose.model('Company', Company)