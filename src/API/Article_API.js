import client from '../utils/client';

const get_All_Article = async () => {
    try {
        const res = await client.post('/article/get-all-article', {
            hidden_state: true,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_All_Article_By_Doctor = async (docEmail) => {
    try {
        const res = await client.post('/article/get-all-article-by-doctor', {
            email: docEmail,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const addComment = async (articleId, email, content) => {
    try {
        const res = await client.post(`/article/add-comment/${articleId}`, {
            comment_email: email,
            comment_content: content,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};
const addArticle = async (email, article_title, article_content, article_image) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('article_title', article_title);
        formData.append('article_content', article_content);
        if (article_image) formData.append('article_image', article_image);

        const res = await client.post('/article/create-article', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

const updateArticle = async (articleId, article_title, article_content, article_image) => {
    try {
        const formData = new FormData();
        formData.append('article_title', article_title);
        formData.append('article_content', article_content);
        if (article_image) formData.append('article_image', article_image);

        const res = await client.post(`/article/update-article/${articleId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

const getArticlesByDoctor = async (doctorEmail) => {
    try {
        const res = await client.post('/article/get-all-article-by-doctor', {
            email: doctorEmail,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};
const getArticlesBySpecialty = async (specialtyName) => {
    try {
        const res = await client.post('/article/get-all-article-by-speciality', {
            speciality_name: specialtyName,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};
const getArticlesByID = async (id) => {
    try {
        const res = await client.get(`/article/get-article/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const soft_Delete_Article = async (articleId) => {
    try {

        const article_ids = Array.isArray(articleId) ? articleId : [articleId];

        const res = await client.post('/article/soft-del-article', {
            article_ids
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

const perma_Delete_Article = async (articleId) => {
    try {
        const article_Ids = Array.isArray(articleId) ? articleId : [articleId];
        const res = await client.post('/article/perma-del-article', {
            article_Ids
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

const restore_Article = async (articleId) => {
    try {

        const article_ids = Array.isArray(articleId) ? articleId : [articleId];

        const res = await client.post('/article/restore-article', {
            article_ids
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
    get_All_Article,
    getArticlesByDoctor,
    getArticlesBySpecialty,
    getArticlesByID,
    addComment,
    addArticle,
    get_All_Article_By_Doctor,
    soft_Delete_Article,
    perma_Delete_Article,
    restore_Article,
    updateArticle,
};
