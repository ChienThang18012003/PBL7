const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const User1 = require('../models/User1')
const mongoose = require('mongoose')
const axios = require('axios');


class conversation_Controller {

    add_Conversation = async (req, res) => {
        const { email, receiverId } = req.body;

        const user = await User1.findOne({email:email})
        if (!user) {
            return res.status(500).json({ error: 'User not found.' });
        }
        
        const senderId = user?._id
        try {
            // Tìm nếu đã tồn tại
            let existingConversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
            }).populate({
            path: 'members',
            select: 'email username profile_image'
            });

            if (existingConversation) {
            return res.status(200).json(existingConversation);
            }

            // Tạo mới nếu chưa có
            const newConversation = new Conversation({
            members: [senderId, receiverId]
            });

            await newConversation.save();

            // Populate sau khi tạo
            const populatedConversation = await Conversation.findById(newConversation._id)
            .populate({
                path: 'members',
                select: 'email username profile_image'
            });

            return res.status(201).json(populatedConversation);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi server khi tạo cuộc trò chuyện.' });
        }
    }


    get_Conversations_By_Email = async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User1.findOne({ email: email });
            if (!user) {
            return res.status(404).json({ error: 'User not found' });
            }

            const userId = user._id;

            const conversations = await Conversation.find({
            members: userId
            })
            .sort({ updatedAt: -1 })
            .populate({
                path: 'members',
                select: 'email username profile_image'
            });

            return res.status(200).json(conversations);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi server khi lấy danh sách cuộc trò chuyện.' });
        }
    };   
}

module.exports = new conversation_Controller()
