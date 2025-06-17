import { useState, useEffect } from 'react';
import Company_Followed_API from '../API/Company_Followed_API';

const useCompanyFollowed = () => {
    const [companyFollowedHook, setCompanyFollowedHook] = useState([]);
    const [companyFollowedLoading, isCompanyFollowedLoading] = useState(false);

    const filterResume = async () => {
        isCompanyFollowedLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isCompanyFollowedLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getCompanyFollowedByEmail = async (email) => {
        isCompanyFollowedLoading(true);
        try {
            const langSkill = await Company_Followed_API.get_All_Company_Followed_By_Email(email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch company followed:', error);
            return null;
        } finally {
            isCompanyFollowedLoading(false);
        }
    };

    const getSpecificCompanyFollowed = async (company_id, email) => {
        isCompanyFollowedLoading(true);
        try {
            const langSkill = await Company_Followed_API.get_Specific_Company_Followed(company_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch company followed:', error);
            return null;
        } finally {
            isCompanyFollowedLoading(false);
        }
    };

    const addCompanyFollowed = async (company_id, email) => {
        isCompanyFollowedLoading(true);
        try {
            const langSkill = await Company_Followed_API.add_Company_Followed(company_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to add company followed:', error);
            return null;
        } finally {
            isCompanyFollowedLoading(false);
        }
    };


    const deleteCompanyFollowed = async (company_followed_Id) => {
        isCompanyFollowedLoading(true);
        try {
            const langSkill = await Company_Followed_API.perma_Delete_Company_Followed(company_followed_Id);
            return langSkill;
        } catch (error) {
            console.error('Failed to delete company followed:', error);
            return null;
        } finally {
            isCompanyFollowedLoading(false);
        }
    };

    return [companyFollowedLoading, companyFollowedHook, getCompanyFollowedByEmail, getSpecificCompanyFollowed, addCompanyFollowed, deleteCompanyFollowed];
};

export default useCompanyFollowed;
