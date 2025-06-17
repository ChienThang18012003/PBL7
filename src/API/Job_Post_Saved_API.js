import client from '../utils/client';

const get_All_Job_Post_Saved_By_Email = async (email) => {
    try {
        const res = await client.post('/job-post-saved/get-all-job-post-saved-by-user', {
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Specific_Job_Post_Saved = async (job_post_id, email) => {
    try {
        const res = await client.post('/job-post-saved/get-specific-job-post-saved', {
            job_post_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Job_Post_Saved = async (job_post_id, email) => {
    try {
        const res = await client.post('/job-post-saved/add-job-post-saved', {
            job_post_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const perma_Delete_Job_Post_Saved = async (job_post_saved_Id) => {
    try {
        const job_post_saved_Ids = Array.isArray(job_post_saved_Id) ? job_post_saved_Id : [job_post_saved_Id];
        const res = await client.post('/job-post-saved/delete-job-post-saved', {
            job_post_saved_Ids
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
    get_All_Job_Post_Saved_By_Email,
    get_Specific_Job_Post_Saved,
    add_Job_Post_Saved,
    perma_Delete_Job_Post_Saved
};
