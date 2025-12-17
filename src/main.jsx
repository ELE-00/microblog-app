//main.jsx

import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'

import AppLayout from './AppLayout.jsx';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Feed from './pages/Feed.jsx'
import Profile from './pages/Profile.jsx'

import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
    //Public routes
    {path: "login", element: <Login />},
    {path: "signup", element: <Signup />},


    //Protected app
    {
        path: "/",
        element: (
        <ProtectedRoute> 
            <AppLayout /> 
        </ProtectedRoute>
        ),
        children: [
            {index: true, element: <Feed />},
            {path: "profile", element: <Profile />}

        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router = {router} />
        </AuthProvider>
    </StrictMode>
);
