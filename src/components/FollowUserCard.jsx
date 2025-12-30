//FollowUserCard.jsx
import React, {useState} from 'react';
import '../styles/userCard.css'
import profilePic from '../assets/profilepic.jpg';
import { useNavigate } from 'react-router-dom';

function FollowUserCard({user, type, handleRemoveFollower, handleUnfollow, actionStatus, handleClose}) {
    const navigate = useNavigate();
    
  const isFollowers = type === "followers";

  const targetUser = isFollowers ? user.follower : user.following;
  const profile = targetUser?.profile;

  const profileImage = profile?.profilePic || profilePic;



    const goToProfile = () => {
    const targetId = type === "followers" 
        ? user.follower.id 
        : user.following.id;

    navigate(`/profile/${targetId}`);
    handleClose();
    };

    console.log("targetUser: ", user)

    return  (
        <div className="userCardWrapper" >

            <div>
                <img className="UCProfilepic" src={profileImage} alt="profilePic.jpg" onClick={() => goToProfile()}></img> 
            </div>

            <div className="UCUserInfoWrapper">
                <div className="UCUserInfo">
                    <div className="UCUsername" onClick={() => goToProfile()}>
                        @{targetUser?.username}
                    </div>

                    <div className="UCname">
                    {profile?.name || "—"}
                    </div>

                </div>

                <button className="removeBtn" 
                    onClick={() => type === "followers"
                    ? handleRemoveFollower(targetUser.id)
                    : handleUnfollow(targetUser.id)
                    } 
                    disabled={actionStatus}>

                    {type === "followers"
                    ? actionStatus? "Removed" : "Remove" 
                    : actionStatus? "Unfollowed" : "Following"}
                </button>
            </div>

        </div>
    )
};

export default FollowUserCard;
