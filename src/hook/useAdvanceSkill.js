import { useState, useEffect } from 'react';
import Advance_Skill_API from '../API/Advance_Skill_API';

const useAdvanceSkill = () => {
    const [advanceSkillHook, setAdvanceSkillHook] = useState([]);
    const [advanceSkillLoading, isAdvanceSkillLoading] = useState(false);

    const filterResume = async () => {
        isAdvanceSkillLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isAdvanceSkillLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getAdvanceSkillByResume = async (resumeID) => {
        isAdvanceSkillLoading(true);
        try {
            const advSkill = await Advance_Skill_API.get_All_Advance_Skill_By_Resume(resumeID);
            return advSkill;
        } catch (error) {
            console.error('Failed to fetch advSkill:', error);
            return null;
        } finally {
            isAdvanceSkillLoading(false);
        }
    };

    const addAdvanceSkill = async (resume_id, name, level) => {
        isAdvanceSkillLoading(true);
        try {
            const advSkill = await Advance_Skill_API.add_Advance_Skill(resume_id, name, level);
            return advSkill;
        } catch (error) {
            console.error('Failed to add advSkill:', error);
            return null;
        } finally {
            isAdvanceSkillLoading(false);
        }
    };

    const updateAdvanceSkill = async (id, resume_id, name, level) => {
        isAdvanceSkillLoading(true);
        try {
            const advSkill = await Advance_Skill_API.update_Advance_Skill(id, resume_id, name, level);
            return advSkill;
        } catch (error) {
            console.error('Failed to update advSkill:', error);
            return null;
        } finally {
            isAdvanceSkillLoading(false);
        }
    };

    const deleteAdvanceSkill = async (advance_skill_Id) => {
        isAdvanceSkillLoading(true);
        try {
            const advSkill = await Advance_Skill_API.perma_Delete_Advance_Skill(advance_skill_Id);
            return advSkill;
        } catch (error) {
            console.error('Failed to delete advSkill:', error);
            return null;
        } finally {
            isAdvanceSkillLoading(false);
        }
    };

    return [advanceSkillLoading, advanceSkillHook, getAdvanceSkillByResume, addAdvanceSkill, updateAdvanceSkill, deleteAdvanceSkill];
};

export default useAdvanceSkill;
