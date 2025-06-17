
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Resume_Saved = new Schema({
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
    date_saved: { 
        type: Date, 
        default: Date.now
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Resume_Saved', Resume_Saved)