import client from '../utils/client';

const get_All_Language_Skill_By_Resume = async (id) => {
    try {
        const res = await client.post('/language/get-all-language-skill-by-resume', {
            resume_id: id,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const add_Language_Skill = async (resume_id, language, level) => {
    try {
        const res = await client.post('/language/add-language-skill', {
            resume_id,
            language,
            level
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const update_Language_Skill = async (id, resume_id, language, level) => {
    try {
        const res = await client.post(`/language/update-language-skill/${id}`, {
            resume_id,
            language,
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

const perma_Delete_Language_Skill = async (language_skill_Id) => {
    try {
        const language_skill_Ids = Array.isArray(language_skill_Id) ? language_skill_Id : [language_skill_Id];
        const res = await client.post('/language/delete-language-skill', {
            language_skill_Ids
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
    get_All_Language_Skill_By_Resume,
    add_Language_Skill,
    update_Language_Skill,
    perma_Delete_Language_Skill
};
