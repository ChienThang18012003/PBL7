import { useState, useEffect } from 'react';
import Conversation_API from '../API/Conversation_API';

const useConversation = () => {
    const [conversationHook, setConversationHook] = useState([]);
    const [conversationLoading, isConversationLoading] = useState(false);

    const filterResume = async () => {
        isConversationLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isConversationLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);


    const addConversation = async (email, receiverId) => {
        try {
            const Conversation = await Conversation_API.add_Conversation(email, receiverId);
            return Conversation;
        } catch (error) {
            console.error('Failed to delete Conversation:', error);
            return null;
        } finally {
        }
    };

    const getConversationByEmail = async (email) => {
        try {
            const Conversation = await Conversation_API.get_Conversations_By_Email(email);
            return Conversation;
        } catch (error) {
            console.error('Failed to delete Conversation:', error);
            return null;
        } finally {
        }
    };

    return [conversationLoading, conversationHook, addConversation, getConversationByEmail];
};

export default useConversation;
