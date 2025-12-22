import React, {useState, useEffect} from 'react';
import '../styles/feedItem.css'
import { useAuth } from '../context/AuthContext';

import profilePic from '../assets/profilepic.jpg';
import commentIcon from '../assets/commentIcon.png';
import heartIcon from '../assets/heartIcon.png';
import redHeartIcon from '../assets/redheartIcon.png';
import deleteIcon from '../assets/deleteicon.png';

import { postLiked } from '../api/auth';
import { likePost } from '../api/auth';
import { unlikePost } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const FeedItem = ( {item, handleDeletePost} ) => {
    const navigate = useNavigate();
    const {user} = useAuth();

    const [liked, setLiked] = useState(false);

    const date = new Date(item.createdAt);
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await postLiked(item.id)
                setLiked(!!res.data);
            }catch (err) {
                console.log(err);
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



    return (
        <div className="feedItemWrapper">
            
            <div>
                <img className="FIprofilePic" src={profilePic} alt="profilepic.jpg" onClick={goToProfile}></img> 
            </div>

            <div className="FIcontent">
                <div className="FIcontentHeader">
                    <p className="FIname" onClick={goToProfile}> {item.author.profile.name} </p>
                    <p className="FIusername" onClick={goToProfile}> @{item.author.username} </p>
                    <div className="FIusername"> • {timeString} </div> 
                </div>

                <div> 
                    <p> {item.content} </p> 
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