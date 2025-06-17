import { useState, useEffect } from 'react';
import Resume_Viewed_API from '../API/Resume_Viewed_API';

const useResumeViewed = () => {
    const [resumeViewedHook, setResumeViewedHook] = useState([]);
    const [resumeViewedLoading, isResumeViewedLoading] = useState(false);

    const filterResume = async () => {
        isResumeViewedLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isResumeViewedLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getResumeViewedByEmail = async (email) => {
        isResumeViewedLoading(true);
        try {
            const langSkill = await Resume_Viewed_API.get_All_Resume_Viewed_By_Email(email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch job post saved:', error);
            return null;
        } finally {
            isResumeViewedLoading(false);
        }
    };

    const getSpecificResumeViewed = async (user_id, email) => {
        isResumeViewedLoading(true);
        try {
            const langSkill = await Resume_Viewed_API.get_Specific_Resume_Viewed(user_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch job post saved:', error);
            return null;
        } finally {
            isResumeViewedLoading(false);
        }
    };

    const addResumeViewed = async (user_id, email) => {
        isResumeViewedLoading(true);
        try {
            const langSkill = await Resume_Viewed_API.add_Resume_Viewed(user_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to add job post saved:', error);
            return null;
        } finally {
            isResumeViewedLoading(false);
        }
    };


    const deleteResumeViewed = async (resume_viewed_Id) => {
        isResumeViewedLoading(true);
        try {
            const langSkill = await Resume_Viewed_API.perma_Delete_Resume_Viewed(resume_viewed_Id);
            return langSkill;
        } catch (error) {
            console.error('Failed to delete job post saved:', error);
            return null;
        } finally {
            isResumeViewedLoading(false);
        }
    };

    return [resumeViewedLoading, resumeViewedHook, getResumeViewedByEmail, getSpecificResumeViewed, addResumeViewed, deleteResumeViewed];
};

export default useResumeViewed;
