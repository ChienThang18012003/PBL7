
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Education_Detail = new Schema({
    resume_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resume', 
        required: true 
    },
    degree_name: { 
        type: String, 
        required: true 
    },
    major: { 
        type: String, 
        required: true 
    },
    training_place_name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        default: ""
    },
    start_date: { 
        type: Date, 
        default: Date.now
    },
    completed_date: { 
        type: Date, 
        default: Date.now
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Education_Detail', Education_Detail)