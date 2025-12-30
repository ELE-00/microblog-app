//ProfileCard.jsx
import React, {useState, useEffect} from 'react';
import '../styles/profile.css'
import { useAuth } from '../context/AuthContext.jsx';

import profilePic from '../assets/profilepic.jpg';
import bannerPic from '../assets/background.jpg';
import calendaricon from '../assets/calendaricon.png';
import locationicon from '../assets/locationicon.png';
import jobicon from '../assets/jobicon.png';
import bdayicon from '../assets/bdayicon.png';


const ProfileCard = ({
    profile, 
    followers, 
    following, 
    handleOpenFollowers, 
    handleOpenFollowing, 
    handleFollow, 
    handleUnfollow, 
    handleOpenEditProfile}) => {

    const {user} = useAuth();  

    const isFollowing = followers.some(f => f.followerId === user?.id);

       
    const joinedDate = new Date(profile.createdAt);
    const joinedDateString = joinedDate.toLocaleDateString("en-GB");

    const dobDate = new Date(profile.createdAt);
    const dobDateString = dobDate.toLocaleDateString("en-GB");


    return (
        <div className="profileHeader">
            
            <div className="PCBannerContainer">
                {profile.profile.bannerPic? (
                    <img className="PCBannerPic" src={profile.profile.bannerPic} alt="bannerPic"></img>
                ): (
                    <img className="PCBannerPic" src={bannerPic} alt="bannerPic.jpg" ></img>     
                )}



                <div className="PCPicBtnContainer">
                        {profile.profile.profilePic? (
                        <img className="PCprofilePic" src={profile.profile.profilePic} alt="profilePic"></img>
                    ): (
                        <img className="PCprofilePic" src={profilePic} alt="profilePic.jpg" ></img>     
                    )}



                    {user && profile.id !== user.id && (
                    <button className="followBtn" 
                        onClick={() => isFollowing
                        ? handleUnfollow(profile.id)
                        : handleFollow(profile.id)
                    
                        } 
                        >
                        {isFollowing? "Following" : "Follow"}
                    </button>
                    )}

                    {user && profile.id == user.id && (
                    <button className="profileEditBtn" onClick={() => handleOpenEditProfile()}>Edit profile</button>)}
                </div>

            </div>





            <div className="PCInfoSection">
                
                <div className="PCInfoName" >
                    <p className="profileName">{profile.profile.name}</p>
                    <p className="profileUsername">@{profile.username}</p>
                </div>

                {profile.profile.bio && (
                    <div className="PCInfoBio">
                        <p>{profile.profile.bio}</p>
                    </div>
                )}

            <div className="PCInfoOther">

                {profile.profile.dateOfBirth && (
                <div className="PCInfoOtherItem">                     
                        <img className="profileIcons" src={bdayicon} alt="bdayicon.png" ></img>                         
                        <p>{dobDateString}</p>                     
                </div>
                )}
                
                {profile.profile.occupation && (
                <div className="PCInfoOtherItem">
                    <img className="profileIcons" src={jobicon} alt="bannerPic.png" ></img> 
                    <p>{profile.profile.occupation}</p>
                </div>
                )}

                {profile.profile.location && (
                <div className="PCInfoOtherItem">                     
                        <img className="profileIcons" src={locationicon} alt="bannerPic.png" ></img>                         
                        <p>{profile.profile.location}</p>                     
                </div>
                )}

                <div className="PCInfoOtherItem">
                    <img className="profileIcons" src={calendaricon} alt="calendaricon.png" ></img> 
                    <p>Joined: {joinedDateString}</p>
                </div>


                <div className="PCInfoFollowers">
                    <div className="FcountContainer">
                        <p className="Fcount" onClick={handleOpenFollowing}>{following.length} </p>
                        <p onClick={handleOpenFollowing}>Following</p>
                    </div>
                    <div className="FcountContainer">
                        <p className="Fcount" onClick={handleOpenFollowers}>{followers.length}</p>
                        <p onClick={handleOpenFollowers}>Followers</p>
                    </div>
                </div>


                </div>

            </div>

        </div>
    );
}


export default ProfileCard;