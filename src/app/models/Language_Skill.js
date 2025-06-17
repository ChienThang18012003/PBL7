
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Language_Skill = new Schema({
    resume_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resume', 
        required: true 
    },
    language: { 
        type: String, 
        required: true 
    },
    level: { 
        type: Number, 
        default: 1
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Language_Skill', Language_Skill)