
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Certificate = new Schema({
    resume_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resume', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    training_place: { 
        type: String, 
        required: true 
    },
    start_date: { 
        type: Date, 
        default: Date.now
    },
    expiration_date: { 
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

module.exports = mongoose.model('Certificate', Certificate)