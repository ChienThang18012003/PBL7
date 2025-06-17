
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Company_Followed = new Schema({
    company_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    date_followed: { 
        type: Date, 
        default: Date.now
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Company_Followed', Company_Followed)