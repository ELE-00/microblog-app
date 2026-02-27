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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const { updatePosts } = useAuth();

  // Fetch posts on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    getPosts(1)
      .then((res) => {
        setPosts(res.data.posts);
        setHasMore(res.data.hasMore);
        setPage(1);
      })
      .catch(() => setError("Failed to load posts. Please try again."))
      .finally(() => setLoading(false));
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

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    document.getElementById("postImgInput").value = null;
  };

  // Load more posts
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const res = await getPosts(nextPage);
      setPosts((prev) => [...prev, ...res.data.posts]);
      setHasMore(res.data.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more posts.");
    } finally {
      setLoadingMore(false);
    }
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

      const res = await createPost(data);
      setPosts((prev) => [res.data, ...prev]);
      updatePosts({ post: res.data });

      setFormData({ content: "" });
      setSelectedImage(null);
      document.getElementById("postImgInput").value = null;
    } catch (err) {
      console.log(err);
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
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
        {loading ? (
          <div className="spinnerWrapper">
            <div className="spinner" />
          </div>
        ) : error ? (
          <div className="errorState">
            <p>{error}</p>
            <button
              className="retryBtn"
              onClick={() => {
                setError(null);
                setLoading(true);
                getPosts(1)
                  .then((res) => {
                    setPosts(res.data.posts);
                    setHasMore(res.data.hasMore);
                    setPage(1);
                  })
                  .catch(() => setError("Failed to load posts. Please try again."))
                  .finally(() => setLoading(false));
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <FeedItem
                key={post.id}
                item={post}
                handleDeletePost={handleDeletePost}
              />
            ))}

            {hasMore ? (
              <div className="loadMoreWrapper">
                <button
                  className="loadMoreBtn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            ) : (
              posts.length > 0 && (
                <p className="allCaughtUp">You're all caught up.</p>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
