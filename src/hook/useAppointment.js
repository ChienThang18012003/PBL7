import { useState, useEffect } from 'react';
import Appointment_API from '../API/Appointment_API';
import Account_API from '../API/Account_API';

const useAppointment = () => {
    const [appointmentHook, setAppointmentHook] = useState([]);
    const [appointmentLoading, isAppointmentLoading] = useState(false);

    const filterAppointment = async () => {
        isAppointmentLoading(true);
        try {
            const allAppointments = await Appointment_API.get_All_Appointment();
            setAppointmentHook(allAppointments);
        } catch (error) {
            console.error('Failed to fetch specialities:', error);
        } finally {
            isAppointmentLoading(false);
        }
    };

    const addAppointment = async(user_id, doctor_id, appointment_day, appointment_time_start, appointment_time_end, health_issue, type_service) => {
        await Appointment_API.add_Appointment(user_id, doctor_id, appointment_day, appointment_time_start, appointment_time_end, health_issue, type_service)
    }

    const getAllAppointmentByUserID = async(id) => {
        const Appointments = await Appointment_API.get_All_Appointment_By_UserID(id);
        return Appointments;
    }

    const cancelAppointment = async(id) => {
        await Appointment_API.cancel_Appointment(id);
    }


    useEffect(() => {
        filterAppointment();
    }, []);

    return [appointmentLoading, appointmentHook, addAppointment, getAllAppointmentByUserID, cancelAppointment];
};

export default useAppointment;
