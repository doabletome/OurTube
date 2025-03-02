import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Video from "./pages/Video";
import Profile from "./pages/Profile";
import Login from "./Components/Login";
import VideoUpload from "./pages/VideoUpload";
import SignUp from "./pages/SignUp";
import SearchResults from "./pages/SearchResults";
import axios from "axios";
function App() {
  const [sideNav, setSideNav] = useState(true);

  function handleSideNav() {
    setSideNav(!sideNav);
  }

  return (
    <div className="bg-black min-h-screen">
      <NavBar handleSideNav={handleSideNav} />
      <Routes>
        <Route path="/" element={<Home sideNav={sideNav} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Profile sideNav={sideNav} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults sideNav={sideNav} />} />
      </Routes>
    </div>
  );
}

export default App;
