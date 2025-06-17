import client from '../utils/client';

const add_Message = async (conversationId, email, text) => {
    try {
        const res = await client.post('/message/add-message', {
            conversationId,
            email,
            text
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Message_Between_Users = async (email, userId2) => {
    try {
        const res = await client.post('/message/get-message-between-users', {
            email,
            userId2
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_New_Message = async (conversationId, after) => {
    try {
        const res = await client.post('/message/get-new-message', {
            conversationId,
            after
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

export default {
    add_Message,
    get_Message_Between_Users,
    get_New_Message
};
