import client from '../utils/client';

const get_All_Location = async () => {
    try {
        const res = await client.post('/location/get-location-list', {
            hidden_state: true,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Location = async (city_name, district_id, address, is_deleted, lat, lng) => {
    try {
        const formData = new FormData();
        formData.append('city_name', city_name);
        formData.append('district_id', district_id);
        formData.append('address', address);
        if (is_deleted) formData.append('is_deleted', is_deleted);
        if (lat) formData.append('lat', lat);
        if (lng) formData.append('lng', lng);

        const res = await client.post('/location/add-location', formData, {
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

const change_Location_Info = async (id , city_name, district_id, address, lat, lng) => {
    try {
        const res = await client.post(`/location/update-location/${id}`, {
            city_name,
            district_id,
            address,
            lat,
            lng
        });

        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const delete_Location = async (location_Ids) => {
    try {
        const res = await client.post('/location/delete-location', {
            location_Ids
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

export default {
    get_All_Location,
    add_Location,
    change_Location_Info,
    delete_Location
};
