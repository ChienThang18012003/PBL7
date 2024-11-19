import { useState, useEffect } from 'react';
import Account_API from '../API/Account_API';

const useAccount = () => {
    const [doctorsHook, setDoctorsHook] = useState([]);
    const [loadingAccount, isLoadingAccount] = useState(false);

    const filterAccounts = async () => {
        isLoadingAccount(true);
        try {
            const allDoctors = await Account_API.get_Doctors_List();
            console.log('Doctors from API:', allDoctors);
            setDoctorsHook(allDoctors);
        } catch (error) {
            console.error('Failed to fetch specialities:', error);
        } finally {
            isLoadingAccount(false);
        }
    };

    useEffect(() => {
        filterAccounts();
    }, []);

    const filterDoctorList = async (speciality, region) => {
        const doctorList = await Account_API.filter_Doctors_List(speciality, region);
        return doctorList;
    }

    const checkLogin = async (email, password) => {
        const LoginInfo = await Account_API.checkLogin(email, password);
        return LoginInfo;
    };

    const signUp = async (email, password, username, phone, is_doc) => {
        const SignUpInfo = await Account_API.signUp(email, password, username, phone, is_doc);
        return SignUpInfo;
    };

    const getAccountByID = async (id) => {
        const AccountByID = await Account_API.get_Account_By_ID(id);
        return AccountByID;
    };

    const getAccountByEmail = async (email) => {
        const AccountByEmail = await Account_API.get_Account_By_Email(email);
        return AccountByEmail;
    };

    const checkAccountType = async (id) => {
        const AccountType = await Account_API.check_Account_Type(id);
        return AccountType;
    };

    const uploadProof = async (proof, id) => {
        await Account_API.uploadProof(proof, id);
    }

    const changePassword = async (email, password) => {
        await Account_API.change_Password(email, password);
    }

    const getDoctorActiveList = async (id) => {
        const ActiveList = await Account_API.get_Doctor_Active_List(id);
        return ActiveList;
    }

    const addDoctorActiveHour = async (id, day, start_time, end_time, hour_type) => {
        await Account_API.add_Doctor_Active_Hour(id, day, start_time, end_time, hour_type);
    }


    const changeAccountInfo = async(id ,username, phone, underlying_condition, date_of_birth, address, profile_image = null) => {
        await Account_API.change_Account_Info(id ,username, phone, underlying_condition, date_of_birth, address, profile_image);
    }

    const changeDoctorInfo = async(id , speciality, region, bio) => {
        await Account_API.change_Doctor_Info(id , speciality, region, bio);
    }

    return [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList, getAccountByEmail, checkAccountType, uploadProof, changePassword, getDoctorActiveList, addDoctorActiveHour, changeAccountInfo, changeDoctorInfo];
};

export default useAccount;
