import client from '../utils/client';

const get_All_Resume_Applied_By_Email = async (email) => {
    try {
        const res = await client.post('/resume-applied/get-all-resume-applied-by-user', {
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Resume_Applied = async (id, status) => {
    try {
        const res = await client.post(`/resume-applied/update-resume-applied/${id}`, {
            status
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Specific_Resume_Applied = async (job_post_id, email) => {
    try {
        const res = await client.post('/resume-applied/get-specific-resume-applied', {
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

const add_Resume_Applied = async (resume_id, job_post_id, email) => {
    try {
        const res = await client.post('/resume-applied/add-resume-applied', {
            job_post_id,
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

const count_Resume_Applied = async () => {
    try {
        const res = await client.post('/resume-applied/count-resume-applied');
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const statistic_Resume_Applied_By_Status = async (start_date, end_date) => {
    try {
        const res = await client.post('/resume-applied/statistic-resume-applied-by-status',{
            start_date,
            end_date
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const perma_Delete_Resume_Applied = async (resume_applied_Id) => {
    try {
        const resume_applied_Ids = Array.isArray(resume_applied_Id) ? resume_applied_Id : [resume_applied_Id];
        const res = await client.post('/resume-applied/delete-resume-applied', {
            resume_applied_Ids
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
    get_All_Resume_Applied_By_Email,
    get_Specific_Resume_Applied,
    add_Resume_Applied,
    perma_Delete_Resume_Applied,
    update_Resume_Applied,
    count_Resume_Applied,
    statistic_Resume_Applied_By_Status
};
