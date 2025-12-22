//Comment.jsx
import React, {useState, useEffect} from 'react';
import '../styles/comments.css'
import profilePic from '../assets/profilepic.jpg';
import deleteIcon from '../assets/deleteicon.png';
import { useAuth } from '../context/AuthContext';


const Comments = ({item, handleDeleteComment}) => {
    const {user} = useAuth();
    const date = new Date(item.createdAt);
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})


return (
    <div className="CfeedItemWrapper">

        <div className="CfeedItemContentWrapper">
            <div>
                <img className="CprofilePic" src={profilePic} alt="profilepic.jpg"></img> 
            </div>

            <div className="Ccontent">
                <div className="CcontentHeader">
                    <p className="Cusername"> @{item.user.username} </p>
                    <div className="Ctime"> • {timeString} </div> 
                </div>

                <div> 
                    <p> {item.content} </p> 
                </div>
            </div>

        </div>

        <div>
            {item.user.id === user?.id && (
                <img className="CdeleteBtn" src={deleteIcon} alt="deleteicon.png" onClick={() => handleDeleteComment(item.id)}></img>  
            )} 
        </div>


    </div>
)

}

export default Comments;