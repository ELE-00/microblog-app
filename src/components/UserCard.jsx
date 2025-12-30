//UserCard.jsx
import React, {useState} from 'react';
import '../styles/userCard.css'
import profilePic from '../assets/profilepic.jpg';

function UserCard({user, handleOpenProfile}) {

    console.log(user)

    return  (
        <div className="userCardWrapper" onClick={() => handleOpenProfile(user.id)}>

            <div>
                {user.profile.profilePic? (
                    <img className="UCProfilepic" src={user.profile.profilePic} alt="profilePic"></img>
                ): (
                    <img className="UCProfilepic" src={profilePic} alt="profilePic.jpg" ></img>     
                )}

            </div>

            <div className="UCUserInfoWrapper">
                <div className="UCUserInfo">
                    <div className="UCUsername">
                        {user.username}
                    </div>

                    <div className="UCname">
                        {user.profile.name}
                    </div>
                </div>

            </div>

        </div>
    )
};

export default UserCard;
