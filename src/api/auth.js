//api/auth.js

import axiosClient from './axiosClient.js';

export const signup = async (userData) => {
    return axiosClient.post("/api/auth/signup", userData);
};

export const login = async (userData) => {
    return axiosClient.post("/api/auth/login", userData);
};

export const getProfileData = async () => {
    return axiosClient.get("/api/profile/me");
};

export const createPost = async (postData) => {
    return axiosClient.post("/api/posts", postData);
};

export const getPosts = async () => {
    return axiosClient.get("/api/posts");
};

export const deletePostById = async (postId) => {
    return axiosClient.delete(`/api/posts/${postId}`);
};


export const postLiked = async (postId) => {
    return axiosClient.get(`/api/posts/${postId}/liked`)
}

export const likePost = async (postId) => {
    return axiosClient.post(`/api/posts/${postId}/like`)
}

export const unlikePost = async (postId) => {
    return axiosClient.post(`/api/posts/${postId}/unlike`)
}

export const getPostById = async (postId) => {
    return axiosClient.get(`/api/posts/${postId}`)
}


export const getComments = async (postId) => {
    return axiosClient.get(`/api/posts/${postId}/comments`)
}

export const createComment = async (postId, formData) => {
    return axiosClient.post(`/api/posts/${postId}/comments`, formData)
}


export const deleteComment = async (commentId) => {
    return axiosClient.delete(`/api/posts/comments/${commentId}`)
}

