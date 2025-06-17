import { useState, useEffect } from 'react';
import Message_API from '../API/Message_API';

const useMessage = () => {
    const [messageHook, setMessageHook] = useState([]);
    const [messageLoading, isMessageLoading] = useState(false);

    const filterResume = async () => {
        isMessageLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isMessageLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);


    const addMessage = async (conversationId, email, text) => {
        try {
            const Message = await Message_API.add_Message(conversationId, email, text);
            return Message;
        } catch (error) {
            console.error('Failed to add Conversation:', error);
            return null;
        } finally {
        }
    };

    const getMessageBetweenUsers = async (email, userId2) => {
        try {
            const Message = await Message_API.get_Message_Between_Users(email, userId2);
            return Message;
        } catch (error) {
            console.error('Failed to get Message:', error);
            return null;
        } finally {
        }
    };

    const getNewMessage = async (conversationId, after) => {
        try {
            const Message = await Message_API.get_New_Message(conversationId, after);
            return Message;
        } catch (error) {
            console.error('Failed to get new Message:', error);
            return null;
        } finally {
        }
    };

    return [messageLoading, messageHook, addMessage, getMessageBetweenUsers, getNewMessage];
};

export default useMessage;
