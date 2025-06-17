import { useState, useEffect } from 'react';
import Resume_Saved_API from '../API/Resume_Saved_API';

const useResumeSaved = () => {
    const [resumeSavedHook, setResumeSavedHook] = useState([]);
    const [resumeSavedLoading, isResumeSavedLoading] = useState(false);

    const filterResume = async () => {
        isResumeSavedLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isResumeSavedLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getResumeSavedByEmail = async (email) => {
        isResumeSavedLoading(true);
        try {
            const langSkill = await Resume_Saved_API.get_All_Resume_Saved_By_Email(email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch job post saved:', error);
            return null;
        } finally {
            isResumeSavedLoading(false);
        }
    };

    const getSpecificResumeSaved = async (resume_id, email) => {
        isResumeSavedLoading(true);
        try {
            const langSkill = await Resume_Saved_API.get_Specific_Resume_Saved(resume_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch job post saved:', error);
            return null;
        } finally {
            isResumeSavedLoading(false);
        }
    };

    const addResumeSaved = async (resume_id, email) => {
        isResumeSavedLoading(true);
        try {
            const langSkill = await Resume_Saved_API.add_Resume_Saved(resume_id, email);
            return langSkill;
        } catch (error) {
            console.error('Failed to add job post saved:', error);
            return null;
        } finally {
            isResumeSavedLoading(false);
        }
    };


    const deleteResumeSaved = async (resume_saved_Id) => {
        isResumeSavedLoading(true);
        try {
            const langSkill = await Resume_Saved_API.perma_Delete_Resume_Saved(resume_saved_Id);
            return langSkill;
        } catch (error) {
            console.error('Failed to delete job post saved:', error);
            return null;
        } finally {
            isResumeSavedLoading(false);
        }
    };

    return [resumeSavedLoading, resumeSavedHook, getResumeSavedByEmail, getSpecificResumeSaved, addResumeSaved, deleteResumeSaved];
};

export default useResumeSaved;
