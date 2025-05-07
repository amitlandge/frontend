import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Post = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id);
    formData.append("description", description);

    try {
      const res = await axios.post(
        "http://localhost:3000/create-post",
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert("Post uploaded successfully!");
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1>Create Your Post</h1>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a description..."
      />
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />

      {previewUrl && file && file.type.startsWith("image") && (
        <img src={previewUrl} alt="preview" style={{ width: 200 }} />
      )}
      {previewUrl && file && file.type.startsWith("video") && (
        <video src={previewUrl} controls style={{ width: 200 }} />
      )}

      <button type="submit">Upload Post</button>
    </form>
  );
};

export default Post;
