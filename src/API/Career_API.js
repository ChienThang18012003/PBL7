import client from '../utils/client';

const get_All_Career = async () => {
    try {
        const res = await client.post('/career/get-career-list',{
            hidden_state: false,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Career = async (career_name, career_logo) => {
    try {
        const formData = new FormData();
        if (career_name) formData.append('career_name', career_name);
        if (career_logo) formData.append('career_logo', career_logo);
        const res = await client.post('/career/add-career', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Career = async (id, career_name, career_logo) => {
    try {
        const formData = new FormData();
        if (career_name) formData.append('career_name', career_name);
        if (career_logo) formData.append('career_logo', career_logo);
        const res = await client.post(`/career/update-career/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const delete_Career = async (career_Ids) => {
    try {
        const res = await client.post('/career/delete-career',{
            career_Ids
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const statistic_Top5_Career_By_Job_Post = async (start_date, end_date) => {
    try {
        const res = await client.post('/career/statistic-top5-career-by-job-post',{
            start_date,
            end_date
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};


export default {
    get_All_Career,
    add_Career,
    update_Career,
    delete_Career,
    statistic_Top5_Career_By_Job_Post
};
