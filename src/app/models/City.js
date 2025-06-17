const mongoose = require('mongoose')
const Schema = mongoose.Schema

const City = new Schema({
    name: { 
        type: String,
        unique: true,
        required: true 
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
})

module.exports = mongoose.model('City', City)