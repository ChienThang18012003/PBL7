import client from '../utils/client';

const get_All_District = async () => {
    try {
        const res = await client.post('/district/get-district-list',{
            hidden_state: false,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_All_District_By_City = async (name) => {
    try {
        const res = await client.post('/district/get-district-by-city',{
            name: name,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};


export default {
    get_All_District,
    get_All_District_By_City
};
