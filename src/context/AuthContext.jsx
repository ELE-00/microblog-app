// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket.js";
import { getUserData } from "../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 🔑 GLOBAL USER STATE
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [currentUserPosts, setCurrentUserPosts] = useState([]);

    // FETCH LOGGED-IN USER PROFILE
    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const res = await getUserData(user.id);
                setCurrentUserProfile(res.data);
                setCurrentUserPosts(res.data.posts || []);
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
            }
        };

        fetchData();
    }, [user]);

    // 🧠 CONTEXT UPDATE HELPERS

    const updatePosts = ({ delete: isDelete, id, post }) => {
        if (isDelete) {
            setCurrentUserPosts(prev =>
                prev.filter(p => p.id !== id)
            );
        } else if (post) {
            setCurrentUserPosts(prev => [post, ...prev]);
        }
    };

    const updateProfilePic = (url) => {
        setCurrentUserProfile(prev => ({
        ...prev,
        profile: {
            ...prev.profile,
            profilePic: url,
            },
        }));

        setCurrentUserPosts(prev =>
        prev.map(post =>
        post.author.id === user.id
            ? {
                ...post,
                author: {
                ...post.author,
                profile: {
                    ...post.author.profile,
                    profilePic: url,
                },
                },
            }
            : post
            )
        );
    };


    const updateBannerPic = (url) => {
        setCurrentUserProfile(prev => ({
        ...prev,
        profile: {
            ...prev.profile,
            bannerPic: url,
            },
    }));
};

    const updateProfileData = (data) => {
    setCurrentUserProfile(prev => ({
        ...prev,
        profile: {
        ...prev.profile,
        ...data,
        dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString()
            : prev.profile.dateOfBirth,
        },
    }));
    };

    // AUTH
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        socket.connect();
        socket.emit("user-online", userData.id);
    };

    const logout = () => {
        if (user) {
            socket.emit("user-offline", user.id);
        }

        socket.disconnect();
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                currentUserProfile,
                currentUserPosts,
                updatePosts,
                updateProfilePic,
                updateBannerPic,
                updateProfileData,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
