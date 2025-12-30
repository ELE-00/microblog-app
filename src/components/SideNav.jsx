//SideNav.jsx

import React, { useEffect, useState } from 'react';
import '../styles/sideNav.css';
import homeIcon from '../assets/homeicon.png';
import profileIcon from '../assets/profileicon.png';
import userListIcon from '../assets/userlisticon.png';
import logoutIcon from '../assets/logouticon.png';

import { useAuth } from '../context/AuthContext.jsx';
import profilePic from '../assets/profilepic.jpg';
import { getProfileData } from '../api/auth.js';
import { Link } from 'react-router-dom';

function SideNav() {

    const { user, currentUserProfile, logout } = useAuth();
 
    return (
        <div className="sideNavWrapper">
            <div className="sideNavLinks">
                <div className="linkContainer"> 
                    <img className="linkIcon"  src={homeIcon} alt="homeicon.png"></img>
                    <a className="linkText" href="/">Feed</a>
                    </div>

                <div className="linkContainer">
                    <img className="linkIcon" src={profileIcon} alt="profileicon.png"></img>

                    <Link className="linkText" to={`/profile/${user.id}`}>Profile</Link>

                </div> 

                <div className="linkContainer">
                    <img className="linkIcon" src={userListIcon} alt="userListIcon.png"></img>

                    <Link className="linkText" to={`/AddUser`}>Add User</Link>

                </div> 

                <div className="linkContainer">
                    <img className="linkIcon" src={logoutIcon} alt="logoutIcon.png"></img>
                    <p onClick={logout}>Logout</p>
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


            </div>
        </div>
    );
}

export default SideNav;