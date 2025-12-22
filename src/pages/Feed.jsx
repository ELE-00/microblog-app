
//Feed.jsx
import React, {useState, useEffect} from 'react';
import '../styles/feed.css'
import { getPosts } from '../api/auth.js';
import FeedItem from '../components/FeedItem.jsx';
import { createPost } from '../api/auth.js';
import { deletePostById } from '../api/auth.js';

const Feed = () => {

const [posts, setPosts] = useState([]);
const [formData, setFormData] = useState({content: ""})


//Handle getting posts
useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await getPosts();
            setPosts(res.data)     
        } catch(err){
            console.log(err)
        }
    }

    fetchData();    

}, [])


const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
}


const handleCreatePost = async (e) => {
    e.preventDefault();

    try{
    const res = await createPost(formData)
    setPosts(prev => [res.data, ...prev])

    } catch (err) {
        console.log(err)
    }
}

async function handleDeletePost(postId) {
    try{
        const res = await deletePostById(postId);
        setPosts(prev => prev.filter(post => post.id !== postId))
    } catch (err) {
        console.log(err)
    }


}


    return (
        <div className="bodyWrapper">

            <div className="postFormWrapper">
                <form className="postForm" >
                    <input className="postFormInput" type="text" placeholder="What's happening?" name="content" value={formData.content} onChange={handleChange}></input>
                    <button className="postFormBtn" type="submit" onClick={handleCreatePost}>Send</button>
                </form>
            </div>


            <div className="mainContent">
            { posts.map(post => (
                    <FeedItem key={post.id} item={post} handleDeletePost={handleDeletePost}/>
                ))
            }
            </div>
            
        </div>
    );
};



export default Feed;
