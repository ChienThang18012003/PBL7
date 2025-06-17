import client from '../utils/client';

const get_All_Certificate_By_Resume = async (id) => {
    try {
        const res = await client.post('/certificate/get-all-certificate-by-resume', {
            resume_id: id,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Certificate = async (resume_id, name, training_place, start_date, expiration_date, description) => {
    try {
        const res = await client.post('/certificate/add-certificate', {
            resume_id,
            name,
            training_place,
            start_date,
            expiration_date,
            description
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Certificate = async (id, resume_id, name, training_place, start_date, expiration_date, description) => {
    try {
        const res = await client.post(`/certificate/update-certificate/${id}`, {
            resume_id,
            name,
            training_place,
            start_date,
            expiration_date,
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

const perma_Delete_Certificate = async (certificate_Id) => {
    try {
        const certificate_Ids = Array.isArray(certificate_Id) ? certificate_Id : [certificate_Id];
        const res = await client.post('/certificate/delete-certificate', {
            certificate_Ids
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
    get_All_Certificate_By_Resume,
    add_Certificate,
    update_Certificate,
    perma_Delete_Certificate
};
