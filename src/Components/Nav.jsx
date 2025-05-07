import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../slice/userSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(logout());
        navigate("/home");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const { isLogin } = useSelector((state) => state.user);
  return (
    <div>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
        }}
      >
        <li
          style={{
            listStyle: "none",
            background: "black",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          <NavLink to={"/home"}>Home</NavLink>
        </li>

        {isLogin && (
          <>
            <li
              style={{
                listStyle: "none",
                background: "black",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
            <li
              style={{
                listStyle: "none",
                background: "black",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              <NavLink to={"/post"}>Post</NavLink>
            </li>
          </>
        )}
        {!isLogin ? (
          <li
            style={{
              listStyle: "none",
              background: "black",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            <NavLink to={"/form"}>Login</NavLink>
          </li>
        ) : (
          <li
            style={{
              listStyle: "none",
              background: "black",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            <NavLink onClick={onLogoutHandler}>Logut</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
