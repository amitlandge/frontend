import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitDataHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    if (isLogin) {
      try {
        const res = await axios.post(
          "http://localhost:3000/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (res.status === 200) {
          dispatch(login(res.data?.user));
          navigate("/home");
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    }
    if (!isLogin) {
      try {
        const res = await axios.post(
          "http://localhost:3000/register",
          {
            name,
            email,
            password,
          },
          { withCredentials: true }
        );
        if (res.status === 200) {
          dispatch(login(res.data?.user));
          navigate("/home");
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);
  return (
    <form
      onSubmit={onSubmitDataHandler}
      style={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        gap: "2rem",
      }}
    >
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {!isLogin && (
        <input
          name="name"
          placeholder="Enter Your Name"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      )}
      <input
        name="email"
        placeholder="Enter Your Email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <input
        name="password"
        placeholder="Enter Your Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
      <button
        onClick={() => {
          setLogin((prev) => !prev);
        }}
        type="button"
      >
        Switch To {isLogin ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default Form;
