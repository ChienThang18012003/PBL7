import client from '../utils/client';

const get_All_Feedback = async () => {
    try {
        const res = await client.post('/feedback/get-all-feedback');
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Specific_Feedback = async (email) => {
    try {
        const res = await client.post('/feedback/get-specific-feedback',{
            email: email,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Feedback = async (email, content, rating) => {
    try {
        const res = await client.post('/feedback/add-feedback',{
            email,
            content,
            rating
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Feedback = async (id, content, rating) => {
    try {
        const res = await client.post(`/feedback/update-feedback/${id}`,{
            content,
            rating
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Feedback_Status = async (id, is_active) => {
    try {
        const res = await client.post(`/feedback/update-feedback-status/${id}`,{
            is_active
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const delete_Feedback = async (feedback_Ids) => {
    try {
        const res = await client.post('/feedback/delete-feedback',{
            feedback_Ids
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};


export default {
    get_All_Feedback,
    get_Specific_Feedback,
    add_Feedback,
    update_Feedback,
    update_Feedback_Status,
    delete_Feedback
};
