import client from '../utils/client';

const get_All_Company = async () => {
    try {
        const res = await client.post('/company/get-company-list', {
            hidden_state: true,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Company_ID_By_Email = async (email) => {
    try {
        const res = await client.post('/company/get-company-id-by-email',{
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Company_By_Email = async (email) => {
    try {
        const res = await client.post('/company/get-company-by-email',{
            email
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Company = async (id) => {
    try {
        const res = await client.get(`/company/get-company/${id}`)
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const statistic_Top5_Company = async (id) => {
    try {
        const res = await client.post('/company/statistic-top5-company')
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Company = async (career_id, company_name, company_phone, company_email, employee_size, tax_code, user_id, location_id, website_url, established_date, is_deleted) => {
    try {
        const formData = new FormData();
        formData.append('career_id', career_id);
        formData.append('company_name', company_name);
        formData.append('company_phone', company_phone);
        formData.append('company_email', company_email);
        formData.append('employee_size', employee_size);
        formData.append('tax_code', tax_code);
        formData.append('user_id', user_id);
        formData.append('location_id', location_id);
        formData.append('website_url', website_url);
        formData.append('established_date', established_date);
        formData.append('is_deleted', is_deleted);

        const res = await client.post('/company/add-company', formData, {
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

const update_Company = async (id, career_id, company_name, company_phone, company_email, employee_size, tax_code, location_id, website_url, established_date, description, facebook_url, youtube_url, linkedin_url, logo, cover_image, multi_media = [], delete_images = []) => {
    try {
        const formData = new FormData();
        if (career_id) formData.append('career_id', career_id);
        if (company_name) formData.append('company_name', company_name);
        if (company_phone) formData.append('company_phone', company_phone);
        if (company_email) formData.append('company_email', company_email);
        if (employee_size) formData.append('employee_size', employee_size);
        if (tax_code) formData.append('tax_code', tax_code);
        if (location_id) formData.append('location_id', location_id);
        if (website_url) formData.append('website_url', website_url);
        if (established_date) formData.append('established_date', established_date);
        if (description) formData.append('description', description);
        if (facebook_url) formData.append('facebook_url', facebook_url);
        if (youtube_url) formData.append('youtube_url', youtube_url);
        if (linkedin_url) formData.append('linkedin_url', linkedin_url);
        if (logo) formData.append('logo', logo);
        if (cover_image) formData.append('cover_image', cover_image);
        if (multi_media) formData.append('multi_media', multi_media);
        if (delete_images) formData.append('delete_images', delete_images);

        const res = await client.post(`/company/update-company/${id}`, formData, {
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

const filter_Companies_List = async (city_id, career_id) => {
    try {
        const requestBody = {};
        if (city_id && city_id !== "all") requestBody.city_id = city_id;
        if (career_id && career_id !== "all") requestBody.career_id = career_id;
        requestBody.verified = true;

        const res = await client.post('/company/filter-company', requestBody);
        console.log(res.data)
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};


export default {
    get_All_Company,
    add_Company,
    filter_Companies_List,
    get_Company,
    get_Company_ID_By_Email,
    get_Company_By_Email,
    update_Company,
    statistic_Top5_Company
};
