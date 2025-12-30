//FollowDialog.jsx
import React, {useState, useEffect} from 'react';
import '../styles/followDialog.css'
import FollowUserCard from './FollowUserCard';


const FollowDialog = ({users, type, handleClose, handleRemoveFollower, handleUnfollow, actionStatus}) => {

    return (

        <div className="followDialogWrapper">
            
        <h3> {type === "followers" ? "Followers" : "Following"}</h3> 

        <div className="dialogUserList">

        {users.length === 0 ? "Looks like there is nothing but dust here." 
        : users.map(user => (
            <FollowUserCard 
                key={user.id} 
                user={user} 
                type={type} 
                handleRemoveFollower={handleRemoveFollower} 
                handleUnfollow={handleUnfollow}
                actionStatus={actionStatus}
                handleClose={handleClose}
            >
            </FollowUserCard>
        ))}

        </div>

        <button className="dialogCloseBtn" onClick={handleClose}>Close</button>
            
            
            
        </div>
    )
}

export default FollowDialog;