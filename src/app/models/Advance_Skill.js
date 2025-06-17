
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Advance_Skill = new Schema({
    resume_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resume', 
        required: true 
    },
    name: { 
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

module.exports = mongoose.model('Advance_Skill', Advance_Skill)