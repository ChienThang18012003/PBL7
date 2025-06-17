import client from '../utils/client';

const get_All_Advance_Skill_By_Resume = async (id) => {
    try {
        const res = await client.post('/skill/get-all-advance-skill-by-resume', {
            resume_id: id,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Advance_Skill = async (resume_id, name, level) => {
    try {
        const res = await client.post('/skill/add-advance-skill', {
            resume_id,
            name,
            level
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Advance_Skill = async (id, resume_id, name, level) => {
    try {
        const res = await client.post(`/skill/update-advance-skill/${id}`, {
            resume_id,
            name,
            level
        });

        return res.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response: ', error.response.data.error);
            return error.response.data.error;
        } 
        else {
            console.log('Error not response: ', error.message);
            return error.message;
        } 
    }
};

const perma_Delete_Advance_Skill = async (advance_skill_Id) => {
    try {
        const advance_skill_Ids = Array.isArray(advance_skill_Id) ? advance_skill_Id : [advance_skill_Id];
        const res = await client.post('/skill/delete-advance-skill', {
            advance_skill_Ids
        });

        return res.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response: ', error.response.data.error);
            return error.response.data.error;
        } 
        else {
            console.log('Error not response: ', error.message);
            return error.message;
        } 
    }
};

export default {
    get_All_Advance_Skill_By_Resume,
    add_Advance_Skill,
    update_Advance_Skill,
    perma_Delete_Advance_Skill
};
