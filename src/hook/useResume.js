import { useState, useEffect } from 'react';
import Resume_API from '../API/Resume_API';

const useResume = () => {
    const [resumeHook, setResumeHook] = useState([]);
    const [resumeLoading, isResumeLoading] = useState(false);

    const filterResume = async () => {
        isResumeLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isResumeLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getResume = async (id) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.get_Resume(id);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const getAllResume = async () => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.get_All_Resume();
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const getResumeByEmail = async (email) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.get_Resumes_By_Email(email);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const getDefaultResume = async (email) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.get_Default_Resume(email);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const getAttachedResume = async (email) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.get_Attached_Resume(email);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const addResume = async (email, is_default, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.add_Resume(email, is_default, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal);
            return resume;
        } catch (error) {
            console.error('Failed to add resume:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const updateResume = async (id, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.update_Resume(id, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, city_id, career_id, career_goal);
            return resume;
        } catch (error) {
            console.error('Failed to fetch resume:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const uploadAttachedFile = async (file, id) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.uploadAttachedFile(file, id);
            return resume;
        } catch (error) {
            console.error('Failed to upload file:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    const deleteResume = async (resume_Id) => {
        isResumeLoading(true);
        try {
            const resume = await Resume_API.delete_Resume(resume_Id);
            return resume;
        } catch (error) {
            console.error('Failed to upload file:', error);
            return null;
        } finally {
            isResumeLoading(false);
        }
    };

    return [resumeLoading, resumeHook, getResume, getAttachedResume, getDefaultResume, getResumeByEmail, addResume, updateResume, uploadAttachedFile, getAllResume, deleteResume];
};

export default useResume;
