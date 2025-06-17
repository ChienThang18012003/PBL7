import { useState, useEffect } from 'react';
import Company_API from '../API/Company_API';

const useCompany = () => {
    const [companyHook, setCompanyHook] = useState([]);
    const [loading, isLoading] = useState(false);

    const filterCompanies = async () => {
        isLoading(true);
        try {
            const allCompanies = await Company_API.get_All_Company();
            setCompanyHook(allCompanies)
        } catch (error) {
            console.error('Failed to fetch companies:', error);
        } finally {
            isLoading(false);
        }
    };

    const getAllCompanies = async () => {
        isLoading(true);
        try {
            const allCompanies = await Company_API.get_All_Company();
            return allCompanies;
        } catch (error) {
            console.error('Failed to fetch companies:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const getCompany = async (id) => {
        isLoading(true);
        try {
            const company = await Company_API.get_Company(id);
            return company;
        } catch (error) {
            console.error('Failed to fetch companies:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const getCompanyByEmail = async (email) => {
        isLoading(true);
        try {
            const company = await Company_API.get_Company_By_Email(email);
            return company;
        } catch (error) {
            console.error('Failed to fetch companies:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const getCompanyIDByEmail = async (email) => {
        isLoading(true);
        try {
            const company = await Company_API.get_Company_ID_By_Email(email);
            return company;
        } catch (error) {
            console.error('Failed to fetch companies:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };
    // useEffect(() => {
    //     filterCompanies();
    // }, []);


    const addCompany = async (career_id, company_name, company_phone, company_email, employee_size, tax_code, user_id, location_id, website_url, established_date, is_deleted) => {
        isLoading(true);
        try {
            const newCompany = await Company_API.add_Company(career_id, company_name, company_phone, company_email, employee_size, tax_code, user_id, location_id, website_url, established_date, is_deleted);
            return newCompany;
        } catch (error) {
            console.error('Failed to add company:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const updateCompany = async (id, career_id, company_name, company_phone, company_email, employee_size, tax_code, location_id, website_url, established_date, description, facebook_url, youtube_url, linkedin_url, logo, cover_image, multi_media, delete_images) => {
        isLoading(true);
        try {
            const newCompany = await Company_API.update_Company(id, career_id, company_name, company_phone, company_email, employee_size, tax_code, location_id, website_url, established_date, description, facebook_url, youtube_url, linkedin_url, logo, cover_image, multi_media, delete_images);
            return newCompany;
        } catch (error) {
            console.error('Failed to update company:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const filterCompanyList = async (city_id, career_id) => {
        isLoading(true);
        try {
            const companyList = await Company_API.filter_Companies_List(city_id, career_id);
            
            const filteredCompanyList = (companyList?.data || []).filter((company) => company?.is_deleted === false);
    
            return filteredCompanyList;
        }
        catch(error){
            console.error('Failed to fetch company lists:', error);
            return null;
        }
        finally{
            isLoading(false);
        }
    }

    const searchCompany = (searchValue, displayedCompany) => {
        if (!searchValue) return displayedCompany;

        return displayedCompany.filter((company) => (company?.company_name || '').toLowerCase().includes(searchValue.toLowerCase()));
    };

    return [
        companyHook,
        loading,
        getAllCompanies,
        addCompany,
        filterCompanyList,
        searchCompany,
        getCompany,
        getCompanyIDByEmail,
        getCompanyByEmail,
        updateCompany
    ];
};
export default useCompany;
