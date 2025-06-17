import client from '../utils/client';

const get_All_Company_Followed_By_Email = async (email) => {
    try {
        const res = await client.post('/company-followed/get-all-company-followed-by-user', {
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Specific_Company_Followed = async (company_id, email) => {
    try {
        const res = await client.post('/company-followed/get-specific-company-followed', {
            company_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Company_Followed = async (company_id, email) => {
    try {
        const res = await client.post('/company-followed/add-company-followed', {
            company_id,
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const perma_Delete_Company_Followed = async (company_followed_Id) => {
    try {
        const company_followed_Ids = Array.isArray(company_followed_Id) ? company_followed_Id : [company_followed_Id];
        const res = await client.post('/company-followed/delete-company-followed', {
            company_followed_Ids
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
    get_All_Company_Followed_By_Email,
    add_Company_Followed,
    perma_Delete_Company_Followed,
    get_Specific_Company_Followed
};
