import { useState, useEffect } from 'react';
import Resume_Applied_API from '../API/Resume_Applied_API';

const useResumeApplied = () => {
    const [resumeAppliedHook, setResumeAppliedHook] = useState([]);
    const [resumeAppliedLoading, isResumeAppliedLoading] = useState(false);

    const filterResume = async () => {
        isResumeAppliedLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getResumeAppliedByEmail = async (email, role) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.get_All_Resume_Applied_By_Email(email, role);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const updateResumeApplied = async (id, status) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.update_Resume_Applied(id, status);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const getSpecificResumeApplied = async (job_post_id, email) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.get_Specific_Resume_Applied(job_post_id, email);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const addResumeApplied= async (resume_id, job_post_id, email, employer_id) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.add_Resume_Applied(resume_id, job_post_id, email, employer_id);
            return resume;
        } catch (error) {
            console.error('Failed to add resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const getDistictResumeApplied= async (email, role) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.get_Distict_Resume_Applied(email, role);
            return resume;
        } catch (error) {
            console.error('Failed to add resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const deleteResumeApplied = async (resume_applied_Id) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.perma_Delete_Resume_Applied(resume_applied_Id);
            return resume;
        } catch (error) {
            console.error('Failed to delete resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const countResumeAppliedByUser = async (email) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.count_Resume_Applied_By_User(email);
            return resume;
        } catch (error) {
            console.error('Failed to delete resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const statisticResumeAppliedByStatus = async (email, start_date, end_date) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.statistic_Resume_Applied_By_Status(email, start_date, end_date);
            return resume;
        } catch (error) {
            console.error('Failed to delete resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    const statisticResumeAppliedByDate = async (email, start_date, end_date) => {
        isResumeAppliedLoading(true);
        try {
            const resume = await Resume_Applied_API.statistic_Resume_Applied_By_Date(email, start_date, end_date);
            return resume;
        } catch (error) {
            console.error('Failed to delete resume applied:', error);
            return null;
        } finally {
            isResumeAppliedLoading(false);
        }
    };

    return [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied, updateResumeApplied, countResumeAppliedByUser, statisticResumeAppliedByDate, statisticResumeAppliedByStatus, getDistictResumeApplied];
};

export default useResumeApplied;
