const User1 = require("../models/User1");
const Feedback = require("../models/Feedback");

const ical = require("ical-generator").default;
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");

class feedback_Controller {

    add_Feedback = async (req, res) => {
        try {
            const {
                email,
                content,
                rating
            } = req.body;

            if (
                !email ||
                !rating
            ) {
                throw new Error("Missing information");
            }

            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({error: 'User not found'})
            }

            const newFeedback = await Feedback.create({
                user_id: user?._id,
                content,
                rating
            });

            const populated_Feedback = await Feedback.findById(newFeedback._id)
                .populate(
                    "user_id",
                    "username phone profile_image email"
                )

            return res.status(201).json(populated_Feedback);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    update_Feedback = async (req, res) => {
        try {
            const feedback_id = req.params.id;
            const { content, rating } = req.body;

            // Find and update the appointment
            const newFeedback = await Feedback.findByIdAndUpdate(
                feedback_id,
                { content, rating },
                { new: true }
            )
            .populate("user_id", "username phone email profile_image")

            return res.status(200).json(newFeedback);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    update_Feedback_Status = async (req, res) => {
        try {
            const feedback_id = req.params.id;
            const { is_active } = req.body;

            // Find and update the appointment
            const newFeedback = await Feedback.findByIdAndUpdate(
                feedback_id,
                { is_active },
                { new: true }
            )
            .populate("user_id", "username phone email profile_image")

            return res.status(200).json(newFeedback);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    get_All_Feedback = async (req, res) => {
        try {
            const { is_deleted } = req.body;
            let query = {};

            if (is_deleted !== undefined) {
                query.is_deleted = JSON.parse(is_deleted);
            }

            const feedback = await Feedback.find(query)
                .populate("user_id", "username phone email profile_image")

            return res.status(200).json(feedback);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    getTop4Feedbacks = async (req, res) => {
        try {
            const feedbacks = await Feedback.find({
                is_active: true,
                is_deleted: false
            })
            .sort({ rating: -1, created_at: -1 }) // Ưu tiên rating cao nhất, mới nhất
            .limit(4)
            .populate('user_id', 'username profile_image') // lấy thông tin người dùng (nếu cần)
            .lean();

            return res.status(200).json(feedbacks);
        } catch (error) {
            console.error('Lỗi khi lấy top 4 feedback:', error);
            return res.status(500).json({ error: error.message });
        }
    };

    get_Specific_Feedback = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User1.findOne({email: email});
            
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const feedback = await Feedback.findOne({user_id: user?._id})
                .populate("user_id", "username email phone profile_image")

            return res.status(200).json(feedback);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    get_Feedbacks_By_User_Id = async (req, res) => {
        try {
            const { is_deleted } = req.body;
            const user_id = req.params.id;

            let query = { user_id };

            if (is_deleted !== undefined) {
                query.is_deleted = JSON.parse(is_deleted);
            }

            const feedbacks = await Feedback.find(query)
                .populate("user_id", "username email phone profile_image")

            return res.status(200).json(feedbacks);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    soft_Delete_Feedback= async (req, res) => {
        try {
            // get id list
            const { feedback_Ids } = req.body

            // if no ids
            if (
                !feedback_Ids ||
                !Array.isArray(feedback_Ids) ||
                feedback_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Feedback.updateMany(
            {_id: {$in: feedback_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Feedback soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Feedback= async (req, res) => {
        try {
            // get id list
            const { feedback_Ids } = req.body

            // if no ids
            if (
                !feedback_Ids ||
                !Array.isArray(feedback_Ids) ||
                feedback_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Feedback.updateMany(
                {_id: { $in: feedback_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Feedback restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Feedback = async (req, res) => {
        try {
            // get id list
            const {feedback_Ids} = req.body
            console.log(feedback_Ids)

            // if no ids
            if (
                !feedback_Ids ||
                !Array.isArray(feedback_Ids) ||
                feedback_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Feedback.deleteMany({_id: {$in: feedback_Ids}})

            return res.status(200).json({
                message: 'feedback deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Feedback_By_UserID = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }

            const result = await Feedback.updateMany(
                { user_id: user_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Feedback soft deleted by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Feedback_By_UserId = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Feedback.updateMany(
                { user_id: user_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Feedback restored by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Feedback_By_UserId = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Feedback.deleteMany({ user_id: user_id });
    
            return res.status(200).json({
                message: 'Feedback permanently deleted by user_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    get_Feedback_Info = async (req, res) => {
        try {
            const feedback_id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(feedback_id)) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Invalid feedback ID format" 
                });
            }

            const feedbackData = await Feedback.findById(feedback_id);
            return res.json({ success: true, feedbackData });
        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: error.message });
        }
    };
}

module.exports = new feedback_Controller();
