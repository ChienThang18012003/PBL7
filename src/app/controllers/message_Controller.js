const Message = require('../models/Message')
const User1 = require('../models/User1')
const Conversation = require('../models/Conversation')
const mongoose = require('mongoose')
const axios = require('axios');


class message_Controller {

    add_Message = async (req, res) => {
        const { conversationId, email, text } = req.body;

        try {
            const user = await User1.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ error: 'No user found' });
            }
            console.log(user);

            const conversation = await Conversation.findById(conversationId);
            if (!conversation) {
            return res.status(404).json({ error: 'Conversation không tồn tại.' });
            }

            const newMessage = new Message({
            conversationId,
            senderId: user._id,
            text,
            createdAt: new Date()
            });

            await newMessage.save();

            // Cập nhật updatedAt cho conversation
            conversation.updatedAt = new Date();
            await conversation.save();

            // Populate thông tin người gửi
            const populatedMessage = await Message.findById(newMessage._id).populate({
            path: 'senderId',
            select: 'email username profile_image'
            });

            return res.status(201).json(populatedMessage);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server khi gửi tin nhắn.' });
        }
    };


   get_Messages_Between_Users = async (req, res) => {
        const { email, userId2 } = req.body;

        try {
            const user = await User1.findOne({ email: email });
            if (!user) {
            return res.status(404).json({ error: 'No user found' });
            }
            const userId1 = user._id;

            const conversation = await Conversation.findOne({
            members: { $all: [userId1, userId2] }
            });

            if (!conversation) {
            return res.status(200).json([]); // chưa có tin nhắn nào
            }

            const messages = await Message.find({ conversationId: conversation._id })
            .sort({ createdAt: 1 })
            .populate({
                path: 'senderId',
                select: 'email username profile_image'
            });

            return res.status(200).json({
            conversationId: conversation._id,
            members: conversation.members,
            messages
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server khi lấy tin nhắn.' });
        }
    };

    get_New_Messages_LongPolling = async (req, res) => {
        const { conversationId, after } = req.body;

        if (!conversationId || !after) {
            return res.status(400).json({ error: 'Thiếu conversationId hoặc after timestamp' });
        }

        const since = new Date(after);

        const checkForNewMessages = async () => {
            try {
            const newMessages = await Message.find({
                conversationId,
                createdAt: { $gt: since }
            }).populate({
                path: 'senderId',
                select: 'email username profile_image'
            });

            if (newMessages.length > 0) {
                res.status(200).json(newMessages);
                return true;
            }

            return false;
            } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server khi kiểm tra tin nhắn mới.' });
            return true; // để ngừng polling nếu có lỗi
            }
        };

        let timeout;

        const interval = setInterval(async () => {
            const done = await checkForNewMessages();
            if (done) {
            clearInterval(interval);
            clearTimeout(timeout);
            }
        }, 2000); // kiểm tra mỗi 2 giây

        timeout = setTimeout(() => {
            clearInterval(interval);
            res.status(200).json([]); // không có tin nhắn mới sau 15s
        }, 15000);
    };

}

module.exports = new message_Controller()
