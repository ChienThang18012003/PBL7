import client from '../utils/client';

const get_Resumes_By_Email = async (email) => {
    try {
        const res = await client.post('/resume/get-resumes-by-email', {
            is_deleted: false,
            email: email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Resume = async (id) => {
    try {
        const res = await client.get(`/resume/get-resume/${id}`)
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_All_Resume = async () => {
    try {
        const res = await client.post('/resume/get-resume-list')
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Default_Resume = async (email) => {
    try {
        const res = await client.post('/resume/get-default-resume', {
            email: email
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Attached_Resume = async (email) => {
    try {
        const res = await client.post('/resume/get-attached-resume', {
            email: email
        })
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Resume = async (email, is_default, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal) => {
    try {
        const formData = new FormData();
        if (career_id) formData.append('career_id', career_id);
        if (career_goal) formData.append('career_goal', career_goal);
        if (email) formData.append('email', email);
        if (desired_position) formData.append('desired_position', desired_position);
        if (desired_job_level) formData.append('desired_job_level', desired_job_level);
        if (experience) formData.append('experience', experience);
        if (academic_level) formData.append('academic_level', academic_level);
        if (type_of_workplace) formData.append('type_of_workplace', type_of_workplace);
        if (job_type) formData.append('job_type', job_type);
        if (salary_min) formData.append('salary_min', salary_min);
        if (salary_max) formData.append('salary_max', salary_max);
        if (city_id) formData.append('city_id', city_id);
        if (is_default) formData.append('is_default', is_default);

        const res = await client.post('/resume/add-resume', formData, {
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

const update_Resume = async (id, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal) => {
    try {
        const formData = new FormData();
        if (career_id) formData.append('career_id', career_id);
        if (career_goal) formData.append('career_goal', career_goal);
        if (desired_position) formData.append('desired_position', desired_position);
        if (desired_job_level) formData.append('desired_job_level', desired_job_level);
        if (experience) formData.append('experience', experience);
        if (academic_level) formData.append('academic_level', academic_level);
        if (type_of_workplace) formData.append('type_of_workplace', type_of_workplace);
        if (job_type) formData.append('job_type', job_type);
        if (salary_min) formData.append('salary_min', salary_min);
        if (salary_max) formData.append('salary_max', salary_max);
        if (city_id) formData.append('city_id', city_id);

        const res = await client.post(`/resume/update-resume-info/${id}`, formData, {
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

const uploadAttachedFile = async (file, id) => {
    try {
        const formData = new FormData();
        if (file) formData.append('attached-file', file);

        const res = await client.post(`/resume/upload-attached-file/${id}`, formData, {
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

const delete_Resume = async (resume_Id) => {
    try {
        const resume_Ids = Array.isArray(resume_Id) ? resume_Id : [resume_Id];
        const res = await client.post('/resume/delete-resume', {
            resume_Ids
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


export default {
    get_Resume,
    get_Default_Resume,
    get_Resumes_By_Email,
    add_Resume,
    update_Resume,
    get_Attached_Resume,
    uploadAttachedFile,
    get_All_Resume,
    delete_Resume
};
