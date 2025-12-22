import React, { useEffect, useState } from 'react';
import '../styles/sideNav.css';
import homeIcon from '../assets/homeicon.png';
import profileIcon from '../assets/profileicon.png';
import { useAuth } from '../context/AuthContext.jsx';
import profilePic from '../assets/profilepic.jpg';
import { getProfileData } from '../api/auth.js';

function SideNav() {

    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);

    //Fetch user profile name
    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const res = await getProfileData();
                setProfileData(res.data.profile)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [user])
    
    return (
        <div className="sideNavWrapper">
            <div className="sideNavLinks">
                <div className="linkContainer"> 
                    <img className="linkIcon"  src={homeIcon} alt="homeicon.png"></img>
                    <a className="linkText" href="/">Feed</a>
                    </div>

                <div className="linkContainer">
                    <img className="linkIcon" src={profileIcon} alt="profileicon.png"></img>
                    <a className="linkText" href="/profile">Profile</a>
                    </div>
       
            </div>

            <div className="footerContainer">

                <div> 
                    <img className="profilePic" src={profilePic} alt="profilepic.jpg"></img> 
                </div>

                <div className="contentContainer">
                    <p className="SNname">{profileData?.name}</p>                    
                    <p className="SNusername">@{user.username}</p>
                </div>


            </div>
        </div>
    );
}

export default SideNav;