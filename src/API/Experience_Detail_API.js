import client from '../utils/client';

const get_All_Experience_Detail_By_Resume = async (id) => {
    try {
        const res = await client.post('/experience/get-all-experience-detail-by-resume', {
            resume_id: id,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Experience_Detail = async (resume_id, job_name, company_name, start_date, end_date, description) => {
    try {
        const res = await client.post('/experience/add-experience-detail', {
            resume_id,
            job_name,
            company_name,
            start_date,
            end_date,
            description
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Experience_Detail = async (id, resume_id, job_name, company_name, start_date, end_date, description) => {
    try {
        const res = await client.post(`/experience/update-experience-detail/${id}`, {
            resume_id,
            job_name,
            company_name,
            start_date,
            end_date,
            description
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

const perma_Delete_Experience_Detail = async (experience_detail_Id) => {
    try {
        const experience_detail_Ids = Array.isArray(experience_detail_Id) ? experience_detail_Id : [experience_detail_Id];
        const res = await client.post('/experience/delete-experience-detail', {
            experience_detail_Ids
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
    get_All_Experience_Detail_By_Resume,
    add_Experience_Detail,
    update_Experience_Detail,
    perma_Delete_Experience_Detail
};
