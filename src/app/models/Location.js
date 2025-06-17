const User = require('./User')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Location = new Schema({
    city_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City', 
        required: true 
    },
    district_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'District', 
        required: true 
    },
    lat: { 
        type: String, 
    },
    lng: { 
        type: String, 
    },
    address: { 
        type: String, 
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

module.exports = mongoose.model('Location', Location)