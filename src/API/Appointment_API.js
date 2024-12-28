import client from '../utils/client';

const add_Appointment = async (user_id, doctor_id, appointment_day, appointment_time_start, appointment_time_end, health_issue, type_service) => {
    try {
        const res = await client.post('/appointment/add-appointment', {
            user_id: user_id,
            doctor_id: doctor_id,
            appointment_day: appointment_day,
            appointment_time_start: appointment_time_start,
            appointment_time_end: appointment_time_end,
            health_issue: health_issue,
            type_service: type_service,
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

const add_Insurance = async (id, name, number, location, expiredDate) => {
    try {
        const res = await client.post(`/appointment/add-insurance/${id}`, {
            name: name,
            number: number,
            location: location,
            exp_date: expiredDate,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_All_Appointment = async () => {
    try {
        const res = await client.post('/appointment/get-all-appointment', {
            is_deleted: false,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_All_Appointment_By_UserID = async (id) => {
    try {
        const res = await client.post(`/appointment/get-appointment-by-userid/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_All_Appointment_By_Doctor = async (id) => {
    try {
        const res = await client.post(`/appointment/get-appointment-by-doctor/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const cancel_Appointment = async(id) => {
    try {
        const res = await client.post(`/appointment/cancel-appointment/${id}`);
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

const soft_Delete_Appointment = async(id) => {
    try {
        const res = await client.post(`/appointment/soft-delete-appointment/${id}`);
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

const restore_Appointment = async(id) => {
    try {
        const res = await client.post(`/appointment/restore-appointment/${id}`);
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
    get_All_Appointment,
    add_Appointment,
    get_All_Appointment_By_UserID,
    cancel_Appointment,
    get_All_Appointment_By_Doctor,
    add_Insurance,
    soft_Delete_Appointment,
    restore_Appointment,
};
