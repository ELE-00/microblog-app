// Feed.jsx
import React, { useState, useEffect } from "react";
import "../styles/feed.css";
import { getPosts, createPost, deletePostById } from "../api/auth.js";
import FeedItem from "../components/FeedItem.jsx";
import imageuploadicon from "../assets/imageuploadicon.png";
import { useAuth } from "../context/AuthContext.jsx";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ content: "" });
  const [selectedImage, setSelectedImage] = useState(null);

  const {updatePosts} = useAuth();


  // Fetch posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // Image selection
    const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
    };

    // Remove selected image (optional)
    const handleRemoveImage = () => {
    setSelectedImage(null);
    document.getElementById("postImgInput").value = null;
    };


  // Create post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("content", formData.content);
      if (selectedImage) {
        data.append("postimage", selectedImage);
      }

      const res = await createPost(data); // backend expects multipart/form-data
      setPosts((prev) => [res.data, ...prev]);
      updatePosts({ post: res.data });

      // Reset form
      setFormData({ content: "" });
      setSelectedImage(null);
      document.getElementById("postImgInput").value = null;
    } catch (err) {
      console.log(err);
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    console.log("received post id:", postId)

    try {
      await deletePostById(postId);
      updatePosts({ delete: true, id: postId });
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bodyWrapper">
      <div className="postFormWrapper">
            <form className="postForm" onSubmit={handleCreatePost}>
            <input
                className="postFormInput"
                type="text"
                placeholder="What's happening?"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
            />

            <input
                type="file"
                id="postImgInput"
                name="postimage"
                style={{ display: "none" }}
                onChange={handleImageSelect}
            />
            <img
                className="imgUploadBtn"
                src={imageuploadicon}
                alt="upload"
                onClick={() => document.getElementById("postImgInput").click()}
            />

            {/* Preview selected image */}
            {selectedImage && (
                <div className="imagePreviewWrapper">
                <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="preview"
                    className="postImagePreveiw"
                />
                <button
                    type="button"
                    className="removeImageBtn"
                    onClick={handleRemoveImage}
                >
                    Remove
                </button>
                </div>
            )}



          <button className="postFormBtn" type="submit">
            Send
          </button>
        </form>
      </div>

      <div className="mainContent">
        {posts.map((post) => (
          <FeedItem
            key={post.id}
            item={post}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
