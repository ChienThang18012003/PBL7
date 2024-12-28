import { useState, useEffect } from 'react';
import Post_API from '../API/Post_API';

const usePost = () => {
    const [postHook, setPostHook] = useState([]);
    const [postLoading, isPostLoading] = useState(false);
    useEffect(() => {
        filterPost();
    }, []);

    const filterPost = async () => {
        isPostLoading(true);
        try {
            const allPosts1 = await Post_API.get_All_Posts();
            const allPosts = (allPosts1 || []).filter((post) => post.is_deleted === false);
            const sortedPosts = (allPosts || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPostHook(sortedPosts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            isPostLoading(false);
        }
    };

    const getAllPostsBySpecialty = async (specialtyName, sortBy) => {
        isPostLoading(true);
        try {
            const postsBySpecialty1 = await Post_API.getAllPostsBySpecialty(specialtyName);
            if (!postsBySpecialty1) return [];
            const postsBySpecialty = postsBySpecialty1.filter((post) => post?.is_deleted === false);
    
            if (!sortBy) return postsBySpecialty;
            let filteredPosts;
            if (sortBy && sortBy === 'A-Z')
                filteredPosts = postsBySpecialty.slice().sort((a, b) => a.post_title.localeCompare(b.post_title));
            else if (sortBy && sortBy === 'Z-A')
                filteredPosts = postsBySpecialty.slice().sort((a, b) => b.post_title.localeCompare(a.post_title));
            else if (sortBy && sortBy === 'newest')
                filteredPosts = postsBySpecialty.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return filteredPosts;
        } catch (error) {
            console.error('Failed to fetch posts by speciality:', error);
            return null;
        } finally {
            isPostLoading(false);
        }
    };

    const getAllPosts = async() => {
        try {
            const allPosts1 = await Post_API.get_All_Posts();
            const allPosts = (allPosts1 || []).filter((post) => post?.is_deleted === false);
            const sortedPosts = (allPosts || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return sortedPosts;
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
        }
    }

    const getFilteredPosts = async (specialtyName, sortBy) => {
        try {
            const postsBySpecialty1 = await Post_API.getAllPostsBySpecialty(specialtyName);
            if (!postsBySpecialty1) return [];
            const postsBySpecialty = postsBySpecialty1.filter((post) => post?.is_deleted === false);
    
            if (!sortBy) return postsBySpecialty;
            let filteredPosts;
            if (sortBy && sortBy === 'A-Z')
                filteredPosts = postsBySpecialty.slice().sort((a, b) => a?.post_title.localeCompare(b?.post_title));
            else if (sortBy && sortBy === 'Z-A')
                filteredPosts = postsBySpecialty.slice().sort((a, b) => b?.post_title.localeCompare(a?.post_title));
            else if (sortBy && sortBy === 'newest')
                filteredPosts = postsBySpecialty.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return filteredPosts;
        } catch (error) {
            console.error('Failed to fetch posts by speciality:', error);
            return null;
        } finally {
        }
    };

    const sortAllPosts = (sortBy) => {
        const allPosts = postHook || [];
        if (!sortBy) return postHook;
        let filteredPosts;
        if (sortBy && sortBy === 'A-Z')
            filteredPosts = allPosts.slice().sort((a, b) => a.post_title.localeCompare(b.post_title));
        else if (sortBy && sortBy === 'Z-A')
            filteredPosts = allPosts.slice().sort((a, b) => b.post_title.localeCompare(a.post_title));
        else if (sortBy && sortBy === 'newest')
            filteredPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return filteredPosts;
    };

    const sortFilterdPosts = (sortBy, allPosts) => {
        if (!sortBy) return allPosts;
        let filteredPosts;
        if (sortBy && sortBy === 'A-Z')
            filteredPosts = allPosts.slice().sort((a, b) => a.post_title.localeCompare(b.post_title));
        else if (sortBy && sortBy === 'Z-A')
            filteredPosts = allPosts.slice().sort((a, b) => b.post_title.localeCompare(a.post_title));
        else if (sortBy && sortBy === 'newest')
            filteredPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return filteredPosts;
    };

    const searchPost = (searchValue, displayedPosts) => {
        if (!searchValue) return displayedPosts;

        return displayedPosts.filter((post) => post.post_title.toLowerCase().includes(searchValue.toLowerCase()));
    };

    const addPost = async (email, post_title, post_content, speciality_name) => {
        isPostLoading(true);
        try {
            const newPost = await Post_API.addPost(email, post_title, post_content, speciality_name);
            return newPost;
        } catch (error) {
            console.error('Failed to add post:', error);
            return null;
        } finally {
            isPostLoading(false);
        }
    };

    const getComments = async (id) => {
        try {
            const commentList = await Post_API.getComments(id);
            return commentList;
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            return null;
        } finally {
        }
    };

    const updateComment = async (postId, commentId, comment_content) => {
        isPostLoading(true);
        try {
            const newComment = await Post_API.updateComment(postId, commentId, comment_content);
            return newComment;
        } catch (error) {
            console.error('Failed to update comment:', error);
            return null;
        } finally {
            isPostLoading(false);
        }
    };

    const deleteComment = async (postId, commentId) => {
        isPostLoading(true);
        try {
            const Comment = await Post_API.deleteComment(postId, commentId);
            return Comment;
        } catch (error) {
            console.error('Failed to delete comment:', error);
            return null;
        } finally {
            isPostLoading(false);
        }
    };

    const getPost = async (id) => {
        isPostLoading(true);
        try {
            const post = await Post_API.getPost(id);
            return post;
        } catch (error) {
            console.error('Failed to get post by ID:', error);
            return null;
        } finally {
            isPostLoading(false);
        }
    };

    const addComment = async (postId, email, content) => {
        isPostLoading(true);
        try {
            const postComment = await Post_API.addComment(postId, email, content);
            return postComment;
        } catch (error) {
            console.error('Failed to add comment:', error);
            return null;
        } finally {
            isPostLoading(false);
        }
    };

    return [postLoading, postHook, getAllPostsBySpecialty, sortAllPosts, addPost, searchPost, getPost, addComment, updateComment, deleteComment, getComments, getAllPosts, getFilteredPosts, sortFilterdPosts];
};

export default usePost;
