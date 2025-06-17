import client from '../utils/client';

const get_All_Resume_Viewed_By_Email = async (email) => {
    try {
        const res = await client.post('/resume-viewed/get-all-resume-viewed-by-email', {
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Specific_Resume_Viewed = async (user_id, email) => {
    try {
        const res = await client.post('/resume-viewed/get-specific-resume-viewed', {
            user_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Resume_Viewed = async (user_id, email) => {
    try {
        const res = await client.post('/resume-viewed/add-resume-viewed', {
            user_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const perma_Delete_Resume_Viewed = async (resume_viewed_Id) => {
    try {
        const resume_viewed_Ids = Array.isArray(resume_viewed_Id) ? resume_viewed_Id : [resume_viewed_Id];
        const res = await client.post('/resume-viewed/delete-resume-viewed', {
            resume_viewed_Ids
        });

        return res.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response: ', error.response.data.error);
            return error.response.data.error;
        } 
        else {
            console.log('Error not response: ', error.message);
            return error.message;
        } 
    }
};

export default {
    get_All_Resume_Viewed_By_Email,
    get_Specific_Resume_Viewed,
    add_Resume_Viewed,
    perma_Delete_Resume_Viewed
};
