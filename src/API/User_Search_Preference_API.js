import client from '../utils/client';

const add_User_Search = async (email, keyword, city_id, career_id) => {
    try {
        const body = {
            email,
            keyword,
        };

        if (city_id !== '') body.city_id = city_id;
        if (career_id !== '') body.career_id = career_id;

        const res = await client.post('/user-search/add-user-search', body);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

export default {
    add_User_Search
};
