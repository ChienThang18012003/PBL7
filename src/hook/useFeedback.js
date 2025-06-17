import { useState, useEffect } from 'react';
import Feedback_API from '../API/Feedback_API';

const useFeedback = () => {
    const [feedbackHook, setFeedbackHook] = useState([]);
    const [feedbackLoading, isFeedbackLoading] = useState(false);

    const getAllFeedback = async () => {
        isFeedbackLoading(true);
        try {
            const allFeedbacks = await Feedback_API.get_All_Feedback();
            return allFeedbacks;
        } catch (error) {
            console.error('Failed to fetch Feedbacks:', error);
            return null;
        } finally {
            isFeedbackLoading(false);
        }
    };

    const getSpecificFeedback = async (email) => {
        isFeedbackLoading(true);
        try {
            const allFeedbacks = await Feedback_API.get_Specific_Feedback(email);
            return allFeedbacks;
        } catch (error) {
            console.error('Failed to fetch Feedbacks:', error);
            return null;
        } finally {
            isFeedbackLoading(false);
        }
    };

    const getTop4Feedback = async () => {
        isFeedbackLoading(true);
        try {
            const allFeedbacks = await Feedback_API.get_Top4_Feedback();
            return allFeedbacks;
        } catch (error) {
            console.error('Failed to fetch Feedbacks:', error);
            return null;
        } finally {
            isFeedbackLoading(false);
        }
    };

    const addFeedback = async (email, content, rating) => {
        isFeedbackLoading(true);
        try {
            const newFeedback = await Feedback_API.add_Feedback(email, content, rating);
            return newFeedback;
        } catch (error) {
            console.error('Failed to add Feedback:', error);
            return null;
        } finally {
            isFeedbackLoading(false);
        }
    };

    const changeFeedback = async (id, content, rating) => {
        isFeedbackLoading(true);
        try {
            const newFeedback = await Feedback_API.update_Feedback(id, content, rating);
            return newFeedback;
        } catch (error) {
            console.error('Failed to change Feedback:', error);
            return null;
        } finally {
            isFeedbackLoading(false);
        }
    };

    const changeFeedbackStatus = async (id, is_active) => {
        isFeedbackLoading(true);
        try {
            const newFeedback = await Feedback_API.update_Feedback_Status(id, is_active);
            return newFeedback;
        } catch (error) {
            console.error('Failed to change Feedback:', error);
            return null;
        } finally {
            isFeedbackLoading(false);
        }
    };

    const deleteFeedback = async (feedback_Ids) => {
        isFeedbackLoading(true);
        try {
            const newFeedback = await Feedback_API.delete_Feedback(feedback_Ids);
            return newFeedback;
        } catch (error) {
            console.error('Failed to delete feedback:', error);
            return null;
        } finally {
            isFeedbackLoading(false);
        }
    };

    return [feedbackLoading, feedbackHook, getAllFeedback, getSpecificFeedback, addFeedback, changeFeedback, changeFeedbackStatus, deleteFeedback, getTop4Feedback];
};

export default useFeedback;
