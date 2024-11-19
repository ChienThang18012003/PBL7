import client from '../utils/client';

const checkLogin = async (email, password) => {
    try {
        const res = await client.post('/acc/login', {
            email: email,
            password: password,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response 1: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const signUp = async (email, password, username, phone, is_doc) => {
    try {
        const res = await client.post('/acc/signup', {
            email: email,
            password: password,
            username: username,
            phone: phone,
            is_doc: is_doc,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response 1: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
}

const filter_Doctors_List = async (speciality, region) => {
    try {
        const res = await client.post('/acc/filter-doctor-list', {
            speciality: speciality,
            region: region,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Doctors_List = async () => {
    try {
        const res = await client.post('/acc/acc-list', {
            user: false,
            hidden_state: false,
            verified: false,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Account_By_ID = async (id) => {
    try {
        const res = await client.post(`/acc/get-acc/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Account_By_Email = async (email) => {
    try {
        const res = await client.post('/acc/get-acc-mail', {
            email: email,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const check_Account_Type = async (id) => {
    try {
        const res = await client.post('/acc/check-account-type', {
            _id: id
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const uploadProof = async (proof, id) => {
    try {
        const formData = new FormData();
        if (proof) formData.append('proof', proof);

        const res = await client.post(`/acc/upload-proof/${id}`, formData, {
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

const change_Account_Info = async (id ,username, phone, underlying_condition, date_of_birth, address, profile_image = null) => {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('phone', phone);
        formData.append('underlying_condition', underlying_condition);
        formData.append('date_of_birth', date_of_birth);
        formData.append('address', address);
        if (profile_image !== null) formData.append('profile_image', profile_image);

        const res = await client.post(`/acc/update-acc-info/${id}`, formData, {
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

const change_Doctor_Info = async (id , speciality, region, bio) => {
    try {

        const res = await client.post(`/acc/update-doc-info/${id}`, {
            speciality: speciality,
            region: region,
            bio: bio,
        });

        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const change_Password = async (email, password) => {
    try {
        const res = await client.post('/acc/change-pass', {
            email: email,
            new_password: password,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Doctor_Active_List = async (id) => {
    try {
        const res = await client.get(`/acc/active-hour-list/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Doctor_Active_Hour = async (id, day, start_time, end_time, hour_type) => {
    try {
        const res = await client.post(`/acc/add-active-hour/${id}`,{
            day: day,
            start_time: start_time,
            end_time: end_time,
            hour_type: hour_type,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};




export default {
    checkLogin,
    signUp,
    get_Doctors_List,
    get_Account_By_ID,
    filter_Doctors_List,
    check_Account_Type,
    get_Account_By_Email,
    uploadProof,
    change_Password,
    get_Doctor_Active_List,
    add_Doctor_Active_Hour,
    change_Account_Info,
    change_Doctor_Info,
};
