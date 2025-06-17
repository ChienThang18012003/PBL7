import client from '../utils/client';

const get_All_Education_Detail_By_Resume = async (id) => {
    try {
        const res = await client.post('/education/get-all-education-detail-by-resume', {
            resume_id: id,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Education_Detail = async (resume_id, degree_name, major, training_place_name, start_date, completed_date, description) => {
    try {
        const res = await client.post('/education/add-education-detail', {
            resume_id,
            degree_name,
            major,
            start_date,
            training_place_name,
            completed_date,
            description
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Education_Detail = async (id, resume_id, degree_name, major, training_place_name, start_date, completed_date, description) => {
    try {
        const res = await client.post(`/education/update-education-detail/${id}`, {
            resume_id,
            degree_name,
            major,
            start_date,
            training_place_name,
            completed_date,
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

const perma_Delete_Education_Detail = async (education_detail_Id) => {
    try {
        const education_detail_Ids = Array.isArray(education_detail_Id) ? education_detail_Id : [education_detail_Id];
        const res = await client.post('/education/delete-education-detail', {
            education_detail_Ids
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
    get_All_Education_Detail_By_Resume,
    add_Education_Detail,
    update_Education_Detail,
    perma_Delete_Education_Detail
};
