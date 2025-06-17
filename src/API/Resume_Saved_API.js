import client from '../utils/client';

const get_All_Resume_Saved_By_Email = async (email) => {
    try {
        const res = await client.post('/resume-saved/get-all-resume-saved-by-email', {
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Specific_Resume_Saved = async (resume_id, email) => {
    try {
        const res = await client.post('/resume-saved/get-specific-resume-saved', {
            resume_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Resume_Saved = async (resume_id, email) => {
    try {
        const res = await client.post('/resume-saved/add-resume-saved', {
            resume_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const perma_Delete_Resume_Saved = async (resume_saved_Id) => {
    try {
        const resume_saved_Ids = Array.isArray(resume_saved_Id) ? resume_saved_Id : [resume_saved_Id];
        const res = await client.post('/resume-saved/delete-resume-saved', {
            resume_saved_Ids
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
    get_All_Resume_Saved_By_Email,
    get_Specific_Resume_Saved,
    add_Resume_Saved,
    perma_Delete_Resume_Saved
};
