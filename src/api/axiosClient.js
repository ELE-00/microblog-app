//api/axiosCLient.js

import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
})

// Attach token automatically
axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosClient;