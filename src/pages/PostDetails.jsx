//PostDetails.jsx
import React, {useState, useEffect} from 'react';
import '../styles/postDetails.css'
import { useNavigate } from 'react-router-dom';

import FeedItem from '../components/FeedItem.jsx';
import Comments from '../components/Comments.jsx';

import { useParams } from 'react-router-dom';
import { getPostById } from '../api/auth.js';
import { getComments } from '../api/auth.js';
import { createComment } from '../api/auth.js';
import { deleteComment } from '../api/auth.js';
import { deletePostById } from '../api/auth.js';

const PostDetails = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [formData, setFormData] = useState({content: ""})

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            console.log("received id: ", id)
            try{
                const res = await getPostById(id)
                setPost(res.data)
            }catch (err) {
                console.log("Failed to get post")
            }
        }
        fetchData();
    }, [id])


    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            console.log("received id: ", id)
            try{
                const res = await getComments(id)
                setComments(res.data)
            }catch (err) {
                console.log("Failed to get post")
            }
        }
        fetchData();
    }, [])


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const handleCreateComment = async (e) => {
        e.preventDefault();

        try{
            const res = await createComment(id, formData)
            setComments(prev => [res.data, ...prev]);
        } catch(err) {
            console.log(err)
        }
    }
    

    async function handleDeleteComment(commentId) {
        try {
            const res = await deleteComment(commentId)
            setComments(prev => prev.filter(comment => comment.id !== commentId));

        }catch (err) {
            console.log(err)
        }

    }


    async function handleDeletePost(postId) {
        try{
            const res = await deletePostById(postId);
            navigate("/")
        } catch (err) {
            console.log(err)
        }


    }



return (
    <div>
        <div className="postContent">

            {post? (
              <FeedItem key={post.id} item={post} handleDeletePost={handleDeletePost}/>  
            ): (
                <p> Loading... </p>
            )}
         </div>

        <div className="commentFormWrapper">
            <form className="commentForm" >
                <input className="commentFormInput" type="text" placeholder="Add a comment" name="content" value={formData.content} onChange={handleChange}></input>
                <button className="commentFormBtn" type="submit" onClick={handleCreateComment}>Send</button>
            </form>
        </div>

         <div className="postContent">
            <p className="commentsHeading">Comments</p>
            {comments.map(c => (
                <Comments key={c.id} item={c} handleDeleteComment={handleDeleteComment}/>
            )             
            )}
         </div>
    </div>
);

};

export default PostDetails;