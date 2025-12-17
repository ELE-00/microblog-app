//api/auth.js

import axiosClient from './axiosClient.js';

export const signup = async (userData) => {
    return axiosClient.post("/api/auth/signup", userData);
};

export const login = async (userData) => {
    return axiosClient.post("/api/auth/login", userData);
};



