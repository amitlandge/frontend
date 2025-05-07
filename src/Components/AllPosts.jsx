import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => state.user);
  const BASE_URL = "http://localhost:3000";
  //   const [likedPosts, setLikedPosts] = useState([]); // to track likes locally
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts", {
        withCredentials: true,
      }); // adjust URL if needed
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleLike = async (postId) => {
    // setLikedPosts((prev) => ({
    //   ...prev,
    //   [postId]: !prev[postId],
    // }));
    // Optionally send like to backend here
    try {
      const res = await axios.put(
        `http://localhost:3000/post-like/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );
      await fetchPosts();

      console.log(res.data?.post?.likes);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };
  const handleShare = (mediaUrl) => {
    const fullUrl = `${BASE_URL}${mediaUrl}`;
    navigator.clipboard.writeText(fullUrl);
    alert("Post link copied to clipboard!");
  };
  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts?.posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              margin: "1rem 0",
              padding: "1rem",
              width: "100%",
              height: "auto",
            }}
          >
            <p>
              {user?._id === post?.userId?._id ? "You" : post?.userId?.name}
            </p>
            {post.mediaType === "image" ? (
              <img
                src={`${BASE_URL}${post.mediaUrl}`}
                alt="Post"
                style={{ maxWidth: "20rem", borderRadius: "8px" }}
              />
            ) : (
              <video
                controls
                src={`${BASE_URL}${post.mediaUrl}`}
                style={{ maxWidth: "20rem", borderRadius: "8px" }}
              />
            )}
            <p>{post.description}</p>
            <div style={{ marginTop: "10px", display: "flex", gap: "1rem" }}>
              <button onClick={() => handleLike(post._id)}>
                {post.likes?.includes(user._id) ? "❤️ Liked" : "🤍 Like"}
              </button>

              <button onClick={() => alert("Comment feature coming soon!")}>
                💬 Comment
              </button>

              <button onClick={() => handleShare(post.mediaUrl)}>
                🔗 Share
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllPosts;
