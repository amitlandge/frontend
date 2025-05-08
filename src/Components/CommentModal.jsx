import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentModal = ({ isOpen, onClose, postId }) => {
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState([]);
  const fetchPosts = async () => {
    console.log(postId);
    try {
      const res = await axios.get(`http://localhost:3000/post/${postId}`, {
        withCredentials: true,
      }); // adjust URL if needed
      console.log(res.data.post.comments);
      setComment(res.data.post.comments);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const res = await axios.post(
        `http://localhost:3000/post-comment/${postId}`,
        {
          newComment: newComment,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      setNewComment("");
      fetchPosts();
    } catch (err) {
      console.error("Error Commenting post:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white w-full sm:w-1/2 p-6 rounded-lg shadow-lg max-h-[60vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* Comment List */}
        <div className="space-y-2 mb-6">
          {comment.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comment?.map((cm, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded text-sm text-gray-800"
              >
                <small>{cm.user?.name}:-</small>
                {cm?.comment}
              </div>
            ))
          )}
        </div>

        {/* Add Comment */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              handleAddComment();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
