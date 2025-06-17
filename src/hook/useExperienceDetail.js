import { useState, useEffect } from 'react';
import Experience_Detail_API from '../API/Experience_Detail_API';

const useExperienceDetail = () => {
    const [experienceDetailHook, setExperienceDetailHook] = useState([]);
    const [experienceDetailLoading, isExperienceDetailLoading] = useState(false);

    const filterResume = async () => {
        isExperienceDetailLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isExperienceDetailLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getExpDetailByResume = async (resumeID) => {
        isExperienceDetailLoading(true);
        try {
            const expDetail = await Experience_Detail_API.get_All_Experience_Detail_By_Resume(resumeID);
            return expDetail;
        } catch (error) {
            console.error('Failed to fetch expDetail:', error);
            return null;
        } finally {
            isExperienceDetailLoading(false);
        }
    };

    const addExpDetail = async (resume_id, job_name, company_name, start_date, end_date, description) => {
        isExperienceDetailLoading(true);
        try {
            const expDetail = await Experience_Detail_API.add_Experience_Detail(resume_id, job_name, company_name, start_date, end_date, description);
            return expDetail;
        } catch (error) {
            console.error('Failed to add expDetail:', error);
            return null;
        } finally {
            isExperienceDetailLoading(false);
        }
    };

    const updateExpDetail = async (id, resume_id, job_name, company_name, start_date, end_date, description) => {
        isExperienceDetailLoading(true);
        try {
            const expDetail = await Experience_Detail_API.update_Experience_Detail(id, resume_id, job_name, company_name, start_date, end_date, description);
            return expDetail;
        } catch (error) {
            console.error('Failed to update expDetail:', error);
            return null;
        } finally {
            isExperienceDetailLoading(false);
        }
    };

    const deleteExpDetail = async (experience_detail_Id) => {
        isExperienceDetailLoading(true);
        try {
            const expDetail = await Experience_Detail_API.perma_Delete_Experience_Detail(experience_detail_Id);
            return expDetail;
        } catch (error) {
            console.error('Failed to delete expDetail:', error);
            return null;
        } finally {
            isExperienceDetailLoading(false);
        }
    };

    return [experienceDetailLoading, experienceDetailHook, getExpDetailByResume, addExpDetail, updateExpDetail, deleteExpDetail];
};

export default useExperienceDetail;
