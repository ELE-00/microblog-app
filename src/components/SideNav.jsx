//SideNav.jsx

import React, { useEffect, useState } from 'react';
import '../styles/sideNav.css';
import homeIcon from '../assets/homeicon.png';
import profileIcon from '../assets/profileicon.png';
import userListIcon from '../assets/userlisticon.png';
import logoutIcon from '../assets/logouticon.png';

import { useAuth } from '../context/AuthContext.jsx';
import profilePic from '../assets/profilepic.jpg';
import lightModeIcon from '../assets/lightMode.png';
import darkModeIcon from '../assets/darkMode.png';
import { getProfileData } from '../api/auth.js';
import { Link } from 'react-router-dom';

function SideNav() {

    const { user, currentUserProfile, logout } = useAuth();

    const [lightMode, setLightMode] = useState(false);

    useEffect(() => {
        if (lightMode) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }, [lightMode]);

    const handleUILightModeON = () => {
        setLightMode(prev => !prev);
    }
 
    return (
        <div className="sideNavWrapper">
            <div className="sideNavLinks">
                <Link className="linkContainer" to="/">
                    <img className="linkIcon" src={homeIcon} alt="homeicon.png" />
                    <span className="linkText">Feed</span>
                </Link>

                <Link className="linkContainer" to={`/profile/${user.id}`}>
                    <img className="linkIcon" src={profileIcon} alt="profileicon.png" />
                    <span className="linkText">Profile</span>
                </Link>

                <Link className="linkContainer" to="/AddUser">
                    <img className="linkIcon" src={userListIcon} alt="userListIcon.png" />
                    <span className="linkText">Add User</span>
                </Link>

                <div className="linkContainer" onClick={logout}>
                    <img className="linkIcon" src={logoutIcon} alt="logoutIcon.png" />
                    <span className="linkText">Logout</span>
                </div>
            </div>

            <div className="footerContainer">

                <div> 

                {currentUserProfile && currentUserProfile.profile.profilePic? (
                    <img className="profilePic" src={currentUserProfile.profile.profilePic} alt="profilePic"></img>
                ): (
                    <img className="profilePic" src={profilePic} alt="profilePic.jpg" ></img>     
                )}

                </div>

                <div className="contentContainer">
                    <p className="SNname">{currentUserProfile?.profile.name}</p>                    
                    <p className="SNusername">@{currentUserProfile?.username}</p>
                </div>

                <div className="UIMode">

                    {lightMode
                        ? <img className="linkIcon" src={darkModeIcon} alt="lightMode.png" onClick={handleUILightModeON}></img>
                        : <img className="linkIcon" src={lightModeIcon} alt="darkMode.png" onClick={handleUILightModeON}></img>                
                    }


                </div>

            </div>
        </div>
    );
}

export default SideNav;