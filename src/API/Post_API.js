import client from '../utils/client';

const get_All_Posts = async () => {
    try {
        const res = await client.get('/post/get-all-post');
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const getAllPostsBySpecialty = async (specialtyName) => {
    try {
        const res = await client.post('/post/get-all-post-by-speciality', {
            speciality_name: specialtyName,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const getPost = async (id) => {
    try {
        const res = await client.get(`/post/get-post/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const addPost = async (email, post_title, post_content, speciality_name) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('post_title', post_title);
        formData.append('post_content', post_content);
        formData.append('speciality_name', speciality_name);

        const res = await client.post('/post/create-post', {
            email: email,
            post_title: post_title,
            post_content: post_content,
            speciality_name: speciality_name,
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

const addComment = async (postId, email, content) => {
    try {
        const res = await client.post(`/post/add-comment/${postId}`, {
            comment_email: email,
            comment_content: content,
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

const updateComment = async (postId, commentId, content) => {
    try {
        const res = await client.post(`/post/${postId}/comment/${commentId}/update`, {
            comment_content: content,
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

const deleteComment = async (postId, commentId) => {
    try {
        console.log("nhim1");
        const res = await client.post(`/post/${postId}/comment/${commentId}/del`);
        console.log("nhim2");
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

const getComments = async (id) => {
    try {
        const res = await client.post(`/post/get-comment/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

export default {
    get_All_Posts,
    getAllPostsBySpecialty,
    addPost,
    getPost,
    addComment,
    updateComment,
    deleteComment,
    getComments,
};
