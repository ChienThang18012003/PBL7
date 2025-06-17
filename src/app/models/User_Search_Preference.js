const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSearchPreference = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User1',
    required: true
  },
  keyword: { 
    type: String, 
    default: '' 
  },
  city_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'City' 
  },
  career_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Career' 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User_Search_Preference', UserSearchPreference);
