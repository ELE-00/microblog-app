//api/auth.js

import axiosClient from './axiosClient.js';

// AUTHENTICATION
export const signup = async (userData) => {
    return axiosClient.post("/api/auth/signup", userData);
};

export const login = async (userData) => {
    return axiosClient.post("/api/auth/login", userData);
};

// USERS
export const getAllUsers = async () => {
    return axiosClient.get(`/api/user`);
};

export const getUserData = async (userId) => {
    return axiosClient.get(`/api/user/${userId}`);
};

// PROFILE
export const UpdateProfileData = async (userData) => {
    return axiosClient.patch("/api/profile/", userData);
};

export const getProfileData = async () => {
    return axiosClient.get("/api/profile/me");
};

export const getfollowers = async (userId) => {
    return axiosClient.get(`/api/follow/followers/${userId}`);
};

export const getfollowing = async (userId) => {
    return axiosClient.get(`/api/follow/following/${userId}`);
};

export const followUser = async (followingId) => {
    return axiosClient.post(`/api/follow/${followingId}/follow`);
};

export const unfollowUser = async (followingId) => {
    return axiosClient.post(`/api/follow/${followingId}/unfollow`);
};

export const removeFollower = async (userId) => {
    return axiosClient.post(`/api/follow/${userId}/removefollower`);
};

export const uploadProfileImage = async (formData) => {
    return axiosClient.post("/api/profile/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const uploadBannerImage = async (formData) => {
    return axiosClient.post("/api/profile/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

// POSTS
export const createPost = async (postData) => {
    // If postData is FormData (with optional image), set proper headers
    const config = postData instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
    
    return axiosClient.post("/api/posts", postData, config);
};

export const getPosts = async (page = 1) => {
    return axiosClient.get("/api/posts", { params: { page, limit: 10 } });
};

export const deletePostById = async (postId) => {
    return axiosClient.delete(`/api/posts/${postId}`);
};

export const postLiked = async (postId) => {
    return axiosClient.get(`/api/posts/${postId}/liked`);
};

export const likePost = async (postId) => {
    return axiosClient.post(`/api/posts/${postId}/like`);
};

export const unlikePost = async (postId) => {
    return axiosClient.post(`/api/posts/${postId}/unlike`);
};

export const getPostById = async (postId) => {
    return axiosClient.get(`/api/posts/${postId}`);
};

// POST COMMENTS
export const getComments = async (postId) => {
    return axiosClient.get(`/api/posts/${postId}/comments`);
};

export const createComment = async (postId, formData) => {
    return axiosClient.post(`/api/posts/${postId}/comments`, formData);
};

export const deleteComment = async (commentId) => {
    return axiosClient.delete(`/api/posts/comments/${commentId}`);
};
