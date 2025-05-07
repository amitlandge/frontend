import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        width: "50%",
        margin: "0 auto",
        borderRadius: "1rem",
      }}
    >
      <h1>Profile</h1>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
