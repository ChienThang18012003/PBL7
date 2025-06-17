import { useState, useEffect } from 'react';
import Job_Post_Saved_API from '../API/Job_Post_Saved_API';

const useJobPostSaved = () => {
    const [jobPostSavedHook, setJobPostSavedHook] = useState([]);
    const [jobPostSavedLoading, isJobPostSavedLoading] = useState(false);

    const filterResume = async () => {
        isJobPostSavedLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isJobPostSavedLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getJobPostSavedByEmail = async (email) => {
        isJobPostSavedLoading(true);
        try {
            const langSkill = await Job_Post_Saved_API.get_All_Job_Post_Saved_By_Email(email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch job post saved:', error);
            return null;
        } finally {
            isJobPostSavedLoading(false);
        }
    };

    const getSpecificJobPostSaved = async (job_post_id, email) => {
        isJobPostSavedLoading(true);
        try {
            const langSkill = await Job_Post_Saved_API.get_Specific_Job_Post_Saved(job_post_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch job post saved:', error);
            return null;
        } finally {
            isJobPostSavedLoading(false);
        }
    };

    const addJobPostSaved = async (job_post_id, email) => {
        isJobPostSavedLoading(true);
        try {
            const langSkill = await Job_Post_Saved_API.add_Job_Post_Saved(job_post_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to add job post saved:', error);
            return null;
        } finally {
            isJobPostSavedLoading(false);
        }
    };


    const deleteJobPostSaved = async (job_post_saved_Id) => {
        isJobPostSavedLoading(true);
        try {
            const langSkill = await Job_Post_Saved_API.perma_Delete_Job_Post_Saved(job_post_saved_Id);
            return langSkill;
        } catch (error) {
            console.error('Failed to delete job post saved:', error);
            return null;
        } finally {
            isJobPostSavedLoading(false);
        }
    };

    return [jobPostSavedLoading, jobPostSavedHook, getJobPostSavedByEmail, getSpecificJobPostSaved, addJobPostSaved, deleteJobPostSaved];
};

export default useJobPostSaved;
