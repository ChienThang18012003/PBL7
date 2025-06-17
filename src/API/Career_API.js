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

const statistic_Top8_Career_By_Job_Post = async () => {
    try {
        const res = await client.post('/career/statistic-top8-career-by-job-post');
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};


export default {
    get_All_Career,
    statistic_Top8_Career_By_Job_Post
};
