const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Career = new Schema({
    career_name: { 
        type: String,
        unique: true, 
        required: true 
    },
    career_logo: {
        type: String,
        default: null 
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
})

module.exports = mongoose.model('Career', Career)