//feedItem.jsx

import React, {useState, useEffect} from 'react';
import '../styles/feedItem.css'
import { useAuth } from '../context/AuthContext';

import profilePic from '../assets/profilepic.jpg';
import commentIcon from '../assets/commentIcon.png';
import heartIcon from '../assets/heartIcon.png';
import redHeartIcon from '../assets/redhearticon.png';
import deleteIcon from '../assets/deleteicon.png';

import { postLiked } from '../api/auth';
import { likePost } from '../api/auth';
import { unlikePost } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const FeedItem = ( {item, handleDeletePost} ) => {

    const navigate = useNavigate();
    const {user, currentUserProfile } = useAuth();

    const [liked, setLiked] = useState(false);

    const date = new Date(item.createdAt);
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await postLiked(item.id)
                setLiked(!!res.data);
            }catch (err) {
            }

        }
        fetchData();
    }, [])


    async function handleLike () {
        if(!liked) {
            await likePost(item.id)
            setLiked(true)  
            item._count.likes += 1;
        } else {
            await unlikePost(item.id)
            setLiked(false)
            item._count.likes -= 1;
        }  
    }


    const goToPost = () => {
        navigate(`/post/${item.id}`)
    }

    const goToProfile = () => {
        navigate(`/profile/${item.author.id}`)
    }

    const isMe = item.author.id === user?.id;

    const profileImage =
        isMe
            ? currentUserProfile?.profile?.profilePic
            : item.author.profile?.profilePic;



    return (
        <div className="feedItemWrapper">
            
            <div className="FIcontentHeader">

            <img
                className="FIprofilePic"
                src={profileImage || profilePic}
                alt="profilePic"
                onClick={goToProfile}
            />

            <div className="FIUserInfo">
                <p className="FIname" onClick={goToProfile}> {item.author.profile.name} </p>
                <p className="FIusername" onClick={goToProfile}> @{item.author.username} </p>
                <div className="FIusername"> • {timeString} </div> 
            </div>

            </div>

            <div className="FIcontent">

                <div> 
                    <p> {item.content} </p> 
                    <img className="postImage" src={item?.image} />
                </div>

                <div className="FIiconsWrapper">

                    <div className="FICommentsIcon">
                        <img className="FIicon" src={commentIcon} alt="commentIcon.png" onClick={goToPost}></img>
                        <p>{item._count.comments}</p> 
                    </div>

                    <div className="FICommentsIcon">
                    {liked? (
                        <img className="FIicon" src={redHeartIcon} alt="redHeartIcon.png" onClick={handleLike}></img> 

                    ): (
                         <img className="FIicon" src={heartIcon} alt="heartIcon.png" onClick={handleLike}></img> 
                    )}

                        <p className="FIicon">{item._count.likes}</p> 
                    </div>

                    <div className="FICommentsIcon">   
                        {item.author.id === user?.id && (
                            <img className="FIdeleteBtn" src={deleteIcon} alt="deleteicon.png" onClick={() => handleDeletePost(item.id)}></img>  
                        )} 
                    </div>

                </div>
            </div>
            
        </div>

    )
}

export default FeedItem;