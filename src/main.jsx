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
import PostDetails from './pages/PostDetails.jsx';
import UserList from './pages/UserList.jsx';
import NotFound from './pages/NotFound.jsx';


import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';


const router = createBrowserRouter([
    //Public routes
    {path: "login", element: <Login />},
    {path: "signup", element: <Signup />},


    //Protected app
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { element: <AppLayout />, children: [
                { index: true, element: <Feed /> },
                { path: "profile/:id", element: <Profile /> },
                { path: "post/:id", element: <PostDetails /> },
                { path: "AddUser", element: <UserList /> },

                // Catch-all 404 route
                { path: "*", element: <NotFound /> }
            ]}
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <AuthProvider>
                <RouterProvider router = {router} />
            </AuthProvider>
        </ErrorBoundary>
    </StrictMode>
);
