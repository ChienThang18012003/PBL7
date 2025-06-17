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

const add_District = async (name, city_name) => {
    try {
        const res = await client.post('/district/add-district',{
            name,
            city_name
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_District = async (id, name, city_name) => {
    try {
        const res = await client.post(`/district/update-district/${id}`,{
            name,
            city_name
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const delete_District = async (district_Id) => {
    try {
        const district_Ids = Array.isArray(district_Id) ? district_Id : [district_Id];
        const res = await client.post('/district/delete-district',{
            district_Ids
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
    get_All_District_By_City,
    update_District,
    add_District,
    delete_District
};
