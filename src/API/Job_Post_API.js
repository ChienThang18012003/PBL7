import client from '../utils/client';

const get_All_Job_Post = async () => {
    try {
        const res = await client.post('/job-post/get-job-post-list', {
            hidden_state: true,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Job_Post = async (id) => {
    try {
        const res = await client.get(`/job-post/get-job-post/${id}`)
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Job_Post_By_Email = async (email) => {
    try {
        const res = await client.post('/job-post/get-job-post-by-email', {
            email: email
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Job_Post_By_Ids = async (job_post_ids) => {
    try {
        const res = await client.post('/job-post/get-job-post-by-ids', {
            job_post_ids
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Job_Post_By_Company = async (company_id) => {
    try {
        const res = await client.post('/job-post/get-job-post-by-company', {
            company_id: company_id
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Job_Post_Name_By_Email = async (email) => {
    try {
        const res = await client.post('/job-post/get-job-post-name-by-email', {
            email: email
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const suggest_Job_By_Email = async (email) => {
    try {
        const res = await client.post('/suggestion/suggest-job', {
            email: email
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const extract_Intent = async (question) => {
    try {
        const res = await client.post('/suggestion/extract-intent', {
            question: question
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Job_Post_View = async (id) => {
    try {
        const res = await client.post(`/job-post/update-job-post-view/${id}`)
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const filter_Job_Posts_List = async (city_id, career_id, is_urgent) => {
    try {
        const requestBody = {};
        if (city_id && city_id !== "all") requestBody.city_id = city_id;
        if (career_id && career_id !== "all") requestBody.career_id = career_id;
        if (is_urgent) requestBody.is_urgent = is_urgent;
        requestBody.verified = true;

        const res = await client.post('/job-post/filter-job-post-list', requestBody);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Job_Post = async (email, career_id, company_id, location_id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent) => {
    try {
        const formData = new FormData();
        if (email) formData.append('email', email);
        if (career_id) formData.append('career_id', career_id);
        if (company_id) formData.append('company_id', company_id);
        if (location_id) formData.append('location_id', location_id);
        if (job_name) formData.append('job_name', job_name);
        if (deadline) formData.append('deadline', deadline);
        if (quantity) formData.append('quantity', quantity);
        if (position) formData.append('position', position);
        if (type_of_workplace) formData.append('type_of_workplace', type_of_workplace);
        if (experience) formData.append('experience', experience);
        if (academic_level) formData.append('academic_level', academic_level);
        if (job_type) formData.append('job_type', job_type);
        if (salary_min) formData.append('salary_min', salary_min);
        if (salary_max) formData.append('salary_max', salary_max);
        if (job_description) formData.append('job_description', job_description);
        if (job_requirement) formData.append('job_requirement', job_requirement);
        if (benefit_enjoyed) formData.append('benefit_enjoyed', benefit_enjoyed);
        if (gender_required) formData.append('gender_required', gender_required);
        if (contact_person_name) formData.append('contact_person_name', contact_person_name);
        if (contact_person_phone) formData.append('contact_person_phone', contact_person_phone);
        if (contact_person_email) formData.append('contact_person_email', contact_person_email);
        if (is_urgent) formData.append('is_urgent', is_urgent);

        const res = await client.post('/job-post/add-job-post', formData, {
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
}

const update_Job_Post = async(id, career_id, company_id, location_id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent) => {
    try {
        const formData = new FormData();
        if (career_id) formData.append('career_id', career_id);
        if (company_id) formData.append('company_id', company_id);
        if (location_id) formData.append('location_id', location_id);
        if (job_name) formData.append('job_name', job_name);
        if (deadline) formData.append('deadline', deadline);
        if (quantity) formData.append('quantity', quantity);
        if (position) formData.append('position', position);
        if (type_of_workplace) formData.append('type_of_workplace', type_of_workplace);
        if (experience) formData.append('experience', experience);
        if (academic_level) formData.append('academic_level', academic_level);
        if (job_type) formData.append('job_type', job_type);
        if (salary_min) formData.append('salary_min', salary_min);
        if (salary_max) formData.append('salary_max', salary_max);
        if (job_description) formData.append('job_description', job_description);
        if (job_requirement) formData.append('job_requirement', job_requirement);
        if (benefit_enjoyed) formData.append('benefit_enjoyed', benefit_enjoyed);
        if (gender_required) formData.append('gender_required', gender_required);
        if (contact_person_name) formData.append('contact_person_name', contact_person_name);
        if (contact_person_phone) formData.append('contact_person_phone', contact_person_phone);
        if (contact_person_email) formData.append('contact_person_email', contact_person_email);
        if (typeof is_urgent !== 'undefined') formData.append('is_urgent', is_urgent);

        const res = await client.post(`/job-post/update-job-post/${id}`, formData, {
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
}

const delete_Job_Post = async(id) => {
    try {
        const res = await client.post(`job-post/delete-job-post/${id}`)
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
}

const count_Job_Post_By_User = async(email) => {
    try {
        const res = await client.post('job-post/count-job-post-by-user',{
            email
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
}

const statistic_Job_Post_By_Academic_Level = async(email, start_date, end_date) => {
    try {
        const res = await client.post('job-post/statistic-job-post-by-academic-level-with-email',{
            email,
            start_date,
            end_date
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
}

const statistic_Top5_Job_Post_By_Resume_Applied = async(email, start_date, end_date) => {
    try {
        const res = await client.post('job-post/statistic-top5-job-post-by-resume-applied',{
            email,
            start_date,
            end_date
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
}

export default {
    get_All_Job_Post,
    filter_Job_Posts_List,
    get_Job_Post,
    update_Job_Post_View,
    get_Job_Post_By_Email,
    add_Job_Post,
    update_Job_Post,
    delete_Job_Post,
    get_Job_Post_Name_By_Email,
    get_Job_Post_By_Company,
    count_Job_Post_By_User,
    statistic_Job_Post_By_Academic_Level,
    statistic_Top5_Job_Post_By_Resume_Applied,
    get_Job_Post_By_Ids,
    suggest_Job_By_Email,
    extract_Intent
};
