import client from '../utils/client';

const get_All_Region = async () => {
    try {
        const res = await client.post('/region/get-region-list',{
            hidden_state: false,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Region_By_ID = async (id) => {
    try {
        const res = await client.post('/region/get-region', {
            region_Id: id
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

export default {
    get_All_Region,
    get_Region_By_ID,
};
