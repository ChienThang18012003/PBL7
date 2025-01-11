import { useState, useEffect } from 'react';
import Account_API from '../API/Account_API';

const useAccount = () => {
    const [doctorsHook, setDoctorsHook] = useState([]);
    const [loadingAccount, isLoadingAccount] = useState(false);

    const filterAccounts = async () => {
        // isLoadingAccount(true);
        // try {
        //     //const allDoctors = await Account_API.get_Doctors_List();
        //     //setDoctorsHook(allDoctors);
        // } catch (error) {
        //     console.error('Failed to fetch accounts:', error);
        // } finally {
        //     isLoadingAccount(false);
        // }
    };

    useEffect(() => {
        filterAccounts();
    }, []);

    const filterDoctorList = async (speciality, region) => {
        isLoadingAccount(true);
        try {
            const doctorList = await Account_API.filter_Doctors_List(speciality, region);
            
            const filteredDoctorList = doctorList.filter((doctor) => doctor?.is_deleted === false);
    
            return filteredDoctorList;
        }
        catch(error){
            console.error('Failed to fetch doctor lists:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const getFilterDoctorList = async (speciality, region) => {
        try {
            const doctorList = await Account_API.filter_Doctors_List(speciality, region);
            
            const filteredDoctorList = doctorList.filter((doctor) => doctor?.is_deleted === false);
    
            return filteredDoctorList;
        } catch (error) {
            console.error('Failed to fetch doctor lists:', error);
            return null;
        } finally {
        }
    };

    const checkLogin = async (email, password) => {
        isLoadingAccount(true);
        try {
            const LoginInfo = await Account_API.checkLogin(email, password);
            return LoginInfo;
        }
        catch(error){
            console.error('Failed to check login:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    };

    const signUp = async (email, password, username, phone, is_doc) => {
        isLoadingAccount(true);
        try {
            const SignUpInfo = await Account_API.signUp(email, password, username, phone, is_doc);
            return SignUpInfo;
        }
        catch(error){
            console.error('Failed to sign up:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    };

    const getAccountByID = async (id) => {
        isLoadingAccount(true);
        try {
            const AccountByID = await Account_API.get_Account_By_ID(id);
            return AccountByID;
        }
        catch(error){
            console.error('Failed to fetch accounts:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    };

    const getAccountByEmail = async (email) => {
        isLoadingAccount(true);
        try {
            const AccountByEmail = await Account_API.get_Account_By_Email(email);
            return AccountByEmail;
        }
        catch(error){
            console.error('Failed to fetch account by email:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    };

    const getAccountStatus = async (email) => {
        try {
            const AccountStatus = await Account_API.get_Account_Status(email);
            return AccountStatus;
        }
        catch(error){
            console.error('Failed to fetch account status:', error);
            return null;
        }
        finally{
        }
    };

    const checkAccountType = async (id) => {
        isLoadingAccount(true);
        try {
            const AccountType = await Account_API.check_Account_Type(id);
            return AccountType;
        }
        catch(error){
            console.error('Failed to fetch accounts:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    };

    const uploadProof = async (proof, id) => {
        isLoadingAccount(true);
        try {
            const newProof = await Account_API.uploadProof(proof, id);
            return newProof;
        }
        catch(error){
            console.error('Failed to upload proof:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const changePassword = async (email, password) => {
        isLoadingAccount(true);
        try {
            const newPass = await Account_API.change_Password(email, password);
            return newPass;
        }
        catch(error){
            console.error('Failed to change password:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
        
    }

    const forgotPassword = async (email) => {
        isLoadingAccount(true);
        try {
            await Account_API.forgot_Password(email);
        }
        catch(error){
            console.error('Failed to reset password:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
        
    }

    const getDoctorActiveList = async (id, load) => {
        if (load) isLoadingAccount(true);
        try {
            const ActiveList = await Account_API.get_Doctor_Active_List(id);
            return ActiveList;
        }
        catch(error){
            console.error('Failed to fetch doctor active list:', error);
            return null;
        }
        finally{
            if (load) isLoadingAccount(false);
        }
    }

    const addDoctorActiveHour = async (id, day, start_time, end_time, hour_type, appointment_limit) => {
        isLoadingAccount(true);
        try {
            const newActiveHour = await Account_API.add_Doctor_Active_Hour(id, day, start_time, end_time, hour_type, appointment_limit);
            return newActiveHour;
        }
        catch(error){
            console.error('Failed to add doctor active hour:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const deleteDoctorActiveHour = async (id, day, start_time, end_time, hour_type) => {
        isLoadingAccount(true);
        try {
            const deletedActiveHour = await Account_API.delete_Doctor_Active_Hour(id, day, start_time, end_time, hour_type);
            return deletedActiveHour;
        }
        catch(error){
            console.error('Failed to delete doctor active hour:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const updateDoctorActiveHour = async (id, day, start_time, end_time, hour_type, appointment_limit, old_day, old_start_time, old_end_time, old_hour_type) => {
        isLoadingAccount(true);
        try {
            const updatedActiveHour = await Account_API.update_Doctor_Active_Hour(id, day, start_time, end_time, hour_type, appointment_limit, old_day, old_start_time, old_end_time, old_hour_type);
            return updatedActiveHour;
        }
        catch(error){
            console.error('Failed to update doctor active hour:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }


    const changeAccountInfo = async(id ,username, phone, underlying_condition, date_of_birth, address, profile_image = null) => {
        isLoadingAccount(true);
        try {
            await Account_API.change_Account_Info(id ,username, phone, underlying_condition, date_of_birth, address, profile_image);
        }
        catch(error){
            console.error('Failed to change account info:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const changeDoctorInfo = async(id , speciality, region, bio) => {
        isLoadingAccount(true);
        try {
            await Account_API.change_Doctor_Info(id , speciality, region, bio);
        }
        catch(error){
            console.error('Failed to change doctor info:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const searchDoctor = (searchValue, displayedDoctors) => {
        if (!searchValue) return displayedDoctors;

        return displayedDoctors.filter((Doctor) => Doctor.username.toLowerCase().includes(searchValue.toLowerCase()));
    };

    const getDoctorList = async() => {
        isLoadingAccount(true);
        try {
            const allDoctors = await Account_API.get_Doctors_List();
            return allDoctors;
        }
        catch(error){
            console.error('Failed to fetch doctor list:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const softDeleteAccount = async(id) => {
        isLoadingAccount(true);
        try {
            const deletedAccount = await Account_API.soft_Delete_Account(id);
            return deletedAccount;
        }
        catch(error){
            console.error('Failed to delete account:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    const getTopDoctors = async() => {
        isLoadingAccount(true);
        try {
            const topDoctors = await Account_API.get_Top_Doctors();
            return topDoctors;
        }
        catch(error){
            console.error('Failed to fetch top doctors:', error);
            return null;
        }
        finally{
            isLoadingAccount(false);
        }
    }

    return [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    getAccountByID, 
    filterDoctorList, 
    getAccountByEmail, 
    checkAccountType, 
    uploadProof, 
    changePassword, 
    getDoctorActiveList, 
    addDoctorActiveHour, 
    changeAccountInfo, 
    changeDoctorInfo, 
    searchDoctor, 
    forgotPassword, 
    getDoctorList, 
    deleteDoctorActiveHour, 
    updateDoctorActiveHour,
    softDeleteAccount,
    getFilterDoctorList,
    getAccountStatus,
    getTopDoctors
    ];
};

export default useAccount;
