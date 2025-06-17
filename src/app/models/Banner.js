const User1 = require('./User1')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Banner = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    banner_image: { 
        type: String, 
        default: null 
    },
    type: { 
        type: String, 
    },
    date_published: { 
        type: Date, 
        default: Date.now 
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
})

module.exports = mongoose.model('Banner', Banner)