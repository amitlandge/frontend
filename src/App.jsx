import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Form from "./Components/form";
import Profile from "./Components/Profile";
import UserPrivate from "./PrivateRoutes/UserPrivate";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./slice/userSlice";
import Post from "./Components/Post";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = async () => {
    const res = await axios.get("http://localhost:3000/profile", {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch(login(res.data?.user));
  };
  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <>
      <nav>
        <Nav />
      </nav>
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route element={<UserPrivate />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
