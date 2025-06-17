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


export default {
    get_All_City,
};
