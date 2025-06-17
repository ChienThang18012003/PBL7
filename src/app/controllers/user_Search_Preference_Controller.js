const User_Search_Preference = require('../models/User_Search_Preference')
const User1 = require('../models/User1')
const mongoose = require('mongoose')
const axios = require('axios');


class user_Search_Preference_Controller {

    add_User_Search = async (req, res) => {
        const { email, keyword, city_id, career_id } = req.body;

        try {
            const user = await User1.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ error: 'No user found' });
            }

            const newSearch = await User_Search_Preference.create({
                user_id: user?._id,
                keyword,
                city_id,
                career_id
            })

            const populatedSearch = await User_Search_Preference.findById(newSearch._id)
            .populate('city_id')
            .populate('career_id');

            return res.status(201).json(populatedSearch);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.messages });
        }
    };

}

module.exports = new user_Search_Preference_Controller()
