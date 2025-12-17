
//Feed.jsx
import React, {useState, useEffect} from 'react';
import '../styles/feed.css'
import { useAuth } from '../context/AuthContext.jsx';
// import {getAllUsers as getAllUsersAPI } from '../api/auth.js';

const Feed = () => {
const {user} = useAuth();

// const [allUsers, setAllUsers] = useState([]);
// const [openProfile, setOpenProfile] = useState(false);
// const [newGroupChat, setNewGroupChat] = useState(false);
// const [selectedConvo, setSelectedConvo] = useState({
//     recipientId: "",
//     recipientName: "",
//     chatId: ""
// });


// //Handle getting messages
// function onSelectChat(chatId, recipientName, recipientId){
//     console.log("Received chat Id: " + chatId)
//     console.log("Received recipientId: " + recipientId)
//     console.log("Received recipientName: " + recipientName)

//     setSelectedConvo({
//         recipientId: recipientId,
//         recipientName: recipientName,
//         chatId: chatId
//     })    
// }

    // //Fetch all users 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await getAllUsersAPI();
    //             setAllUsers(res.data)
    //             console.log("All users: ", res.data);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchData();
    // }, []);



    return(
        <div className="bodyWrapper">
            <div className="mainContent">FEED SECTION</div>
        </div>
    );
};


export default Feed;
