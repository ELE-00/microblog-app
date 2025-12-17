//Chatcard.jsx
import React from 'react';
import '../styles/chatCard.css'
import profilePicMock from "../assets/profilepic.jpg";





function UserCard({item, onClick}) {

    console.log(item)

    return  (
        <div className="chatCardWrapper" onClick={onClick}>
            <div className="profilPicSection">
                <img 
                    className="msgProfilPic" 
                    src={item.profilepic || profilePicMock} 
                    alt="profilepic" 
                />
            </div>

            <div className="infoSection" >
                {item.name}
                
            </div>
            
        </div>
    )
};

export default UserCard;
