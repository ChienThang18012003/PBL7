
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Resume_Viewed = new Schema({
    viewer_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    company_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true 
    },
    date_viewed: { 
        type: Date, 
        default: Date.now
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Resume_Viewed', Resume_Viewed)