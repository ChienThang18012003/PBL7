import client from '../utils/client';

const get_All_Banner = async () => {
    try {
        const res = await client.post('/banner/get-all-banner');
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_All_Banner_By_Type = async (type) => {
    try {
        const res = await client.post('/banner/get-all-banner-by-type', {
            type
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Banner = async (email, type, banner_image) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('type', type);
        formData.append('banner_image', banner_image);

        const res = await client.post('/banner/add-banner', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

const update_Banner = async (id, type, banner_image) => {
    try {
        const formData = new FormData();
        if (type) formData.append('type', type);
        if (banner_image) formData.append('banner_image', banner_image);

        const res = await client.post(`/banner/update-banner/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

const delete_Banner = async (banner_Ids) => {
    try {
        const res = await client.post('/banner/perma-del-banner',{
            banner_Ids
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};


export default {
    get_All_Banner,
    add_Banner,
    update_Banner,
    delete_Banner,
    get_All_Banner_By_Type
};
