import client from '../utils/client';

const add_Conversation = async (email, receiverId) => {
    try {
        const res = await client.post('/conversation/add-conversation', {
            email,
            receiverId
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Conversations_By_Email = async (email) => {
    try {
        const res = await client.post('/conversation/get-conversation-by-email', {
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

export default {
    add_Conversation,
    get_Conversations_By_Email
};
