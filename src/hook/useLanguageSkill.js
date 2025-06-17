import { useState, useEffect } from 'react';
import Language_Skill_API from '../API/Language_Skill_API';

const useLanguageSkill = () => {
    const [languageSkillHook, setLanguageSkillHook] = useState([]);
    const [languageSkillLoading, isLanguageSkillLoading] = useState(false);

    const filterResume = async () => {
        isLanguageSkillLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isLanguageSkillLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getLanguageSkillByResume = async (resumeID) => {
        isLanguageSkillLoading(true);
        try {
            const langSkill = await Language_Skill_API.get_All_Language_Skill_By_Resume(resumeID);
            return langSkill;
        } catch (error) {
            console.error('Failed to fetch langSkill:', error);
            return null;
        } finally {
            isLanguageSkillLoading(false);
        }
    };

    const addLanguageSkill = async (resume_id, language, level) => {
        isLanguageSkillLoading(true);
        try {
            const langSkill = await Language_Skill_API.add_Language_Skill(resume_id, language, level);
            return langSkill;
        } catch (error) {
            console.error('Failed to add langSkill:', error);
            return null;
        } finally {
            isLanguageSkillLoading(false);
        }
    };

    const updateLanguageSkill = async (id, resume_id, language, level) => {
        isLanguageSkillLoading(true);
        try {
            const langSkill = await Language_Skill_API.update_Language_Skill(id, resume_id, language, level);
            return langSkill;
        } catch (error) {
            console.error('Failed to update langSkill:', error);
            return null;
        } finally {
            isLanguageSkillLoading(false);
        }
    };

    const deleteLanguageSkill = async (language_skill_Id) => {
        isLanguageSkillLoading(true);
        try {
            const langSkill = await Language_Skill_API.perma_Delete_Language_Skill(language_skill_Id);
            return langSkill;
        } catch (error) {
            console.error('Failed to delete langSkill:', error);
            return null;
        } finally {
            isLanguageSkillLoading(false);
        }
    };

    return [languageSkillLoading, languageSkillHook, getLanguageSkillByResume, addLanguageSkill, updateLanguageSkill, deleteLanguageSkill];
};

export default useLanguageSkill;
