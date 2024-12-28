import { useState, useEffect } from 'react';
import Appointment_API from '../API/Appointment_API';

const useAppointment = () => {
    const [appointmentHook, setAppointmentHook] = useState([]);
    const [appointmentLoading, isAppointmentLoading] = useState(false);

    const filterAppointment = async () => {
        isAppointmentLoading(true);
        try {
            const allAppointments = await Appointment_API.get_All_Appointment();
            setAppointmentHook(allAppointments);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        } finally {
            isAppointmentLoading(false);
        }
    };

    const addAppointment = async(user_id, doctor_id, appointment_day, appointment_time_start, appointment_time_end, health_issue, type_service) => {
        try {
            const appointment = await Appointment_API.add_Appointment(user_id, doctor_id, appointment_day, appointment_time_start, appointment_time_end, health_issue, type_service)
            return appointment;
        } catch (error) {
            console.error('Failed to add appointments:', error);
            return null
        } finally {
        }
    }

    const addInsurance = async(id, name, number, location, expiredDate) => {
        try {
            await Appointment_API.add_Insurance(id, name, number, location, expiredDate)
        } catch (error) {
            console.error('Failed to add insurance:', error);
            return null
        } finally {

        }
    }

    const getAllAppointmentByUserID = async(id, load = true) => {
        if (load) isAppointmentLoading(true);
        try {
            const Appointments = await Appointment_API.get_All_Appointment_By_UserID(id);
            return Appointments;
        } catch (error) {
            console.error('Failed to fetch appointments by user ID:', error);
            return null
        } finally {
            if (load) isAppointmentLoading(false);
        }
    }

    const getAllAppointmentByDoctor = async(id, load = true) => {
        if (load) isAppointmentLoading(true);
        try {
            const Appointments = await Appointment_API.get_All_Appointment_By_Doctor(id);
            return Appointments;
        } catch (error) {
            console.error('Failed to fetch appointments by doctor:', error);
            return null
        } finally {
            if (load) isAppointmentLoading(false);
        }
    }

    const cancelAppointment = async(id) => {
        isAppointmentLoading(true);
        try {
            const deletedAppointment = await Appointment_API.cancel_Appointment(id);
            return deletedAppointment;
        } catch (error) {
            console.error('Failed to delete appointment:', error);
            return null
        } finally {
            isAppointmentLoading(false);
        }
    }

    const softDeleteAppointment = async(id) => {
        isAppointmentLoading(true);
        try {
            const deletedAppointment = await Appointment_API.soft_Delete_Appointment(id);
            return deletedAppointment;
        } catch (error) {
            console.error('Failed to cancel appointment:', error);
            return null
        } finally {
            isAppointmentLoading(false);
        }
    }

    const restoreAppointment = async(id) => {
        isAppointmentLoading(true);
        try {
            const restoredAppointment = await Appointment_API.restore_Appointment(id);
            return restoredAppointment;
        } catch (error) {
            console.error('Failed to cancel appointment:', error);
            return null;
        } finally {
            isAppointmentLoading(false);
        }
    }


    useEffect(() => {
        filterAppointment();
    }, []);

    return [appointmentLoading, appointmentHook, addAppointment, getAllAppointmentByUserID, cancelAppointment, getAllAppointmentByDoctor, addInsurance, softDeleteAppointment, restoreAppointment];
};

export default useAppointment;
