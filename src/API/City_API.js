import client from '../utils/client';

const get_All_City = async () => {
    try {
        const res = await client.post('/city/get-city-list',{
            hidden_state: false,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_City = async (name) => {
    try {
        const res = await client.post('/city/add-city',{
            name
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_City = async (id, name) => {
    try {
        const res = await client.post(`/city/update-city/${id}`,{
            name
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const delete_City = async (city_Ids) => {
    try {
        const res = await client.post('/city/delete-city',{
            city_Ids
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

export default {
    get_All_City,
    add_City,
    update_City,
    delete_City
};
