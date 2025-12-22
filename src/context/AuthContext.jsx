
//AuthContext.jsx
import React, {createContext, useContext, useState, useEffect} from "react";
import { socket } from "../socket.js";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
    // DEV MODE AUTO LOGIN
    if (import.meta.env.DEV) {
        return {
        id: 1,
        username: "ele",
        token: "dev-token"
        };
    }
    
    //PRODUCTION PERSISTED LOGIN
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;

    });
        
    //LOGIN function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        socket.connect();
        socket.emit("user-online", userData.id);
    };

    //LOGOUT function
    const logout = () => {
        if(user) {
            socket.emit("user-offline", user.id);
        }

        socket.disconnect();

        setUser(null)
        localStorage.removeItem("user")
    }



    return (
        <AuthContext.Provider value = {{user, login, logout}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

