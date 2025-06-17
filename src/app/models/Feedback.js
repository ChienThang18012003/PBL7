const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feedback = Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User1', 
        required: true 
    },
    content: { 
        type: String, 
        default: ""
    },
    rating: { 
        type: Number, 
        required: true
    },
    created_at: { 
        type: Date, 
        default: Date.now
    },
    is_active: { 
        type: Boolean, 
        default: false 
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })


module.exports = mongoose.model('Feedback', Feedback)