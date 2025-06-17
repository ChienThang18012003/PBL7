const User = require('./User')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const District = new Schema({
    city_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('District', District)