import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

const NavBar = ({ handleSideNav }) => {
  const API_BASE = import.meta.env.VITE_API_URL;

  const [userPic, setUserPic] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
  );
  const [navBarModel, setNavBarModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [login, setLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const setLoginModel = (value) => {
    setLogin(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  function onClickOfpopUpOption(value) {
    setNavBarModel(false);
    if (value == "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
  }

  async function getLogoutFun() {
    axios
      .post(`${API_BASE}/auth/logout`, {}, { withCredentials: true })
      .then((res) => console.log("logOut"))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLogin(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
  }, []);
  return (
    <div className="h-14 px-4 flex items-center w-full justify-between fixed top-0 bg-black text-white z-20">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <MenuIcon className="cursor-pointer" onClick={handleSideNav} />
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <YouTubeIcon className="text-red-500 text-3xl" />
          <span className="font-semibold text-lg">YouTube</span>
        </Link>
      </div>

      {/* Middle Section - Search */}
      <form onSubmit={handleSearch} className="hidden md:flex w-1/2">
        <div className="flex w-full border border-gray-700 rounded-full overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-black text-white px-3 py-1 focus:outline-none"
            placeholder="Search"
          />
          <button type="submit" className="p-2 bg-gray-800">
            <SearchOutlinedIcon />
          </button>
        </div>
        <div className="ml-2 p-2 bg-gray-800 rounded-full cursor-pointer">
          <MicOutlinedIcon />
        </div>
      </form>

      {/* Right Section */}
      <div className="relative flex items-center gap-5">
        <Link to="/hj/upload">
          <VideoCallIcon className="cursor-pointer" />
        </Link>

        <NotificationsIcon className="cursor-pointer" />
        {/* User Profile Icon */}
        <img
          onClick={() => setNavBarModel(!navBarModel)}
          src={userPic}
          alt="User"
          className="w-9 h-9 rounded-full cursor-pointer"
        />

        {/* Dropdown Menu - FIXED! */}
        {navBarModel && (
          <div className="absolute top-12 right-0 bg-gray-800 text-white w-40 rounded-md shadow-lg py-2 z-50 border border-gray-600">
            {isLogin && (
              <div
                onClick={() => {
                  let userId = localStorage.getItem("userId");
                  console.log("userId", userId);
                  navigate(`/user/${userId}`);
                  setNavBarModel(false);
                }}
                className="p-2 cursor-pointer hover:bg-gray-700 "
              >
                View Channel
              </div>
            )}

            {isLogin && (
              <div
                onClick={() => {
                  onClickOfpopUpOption("logout");
                }}
                className="p-2 cursor-pointer hover:bg-gray-700"
              >
                Logout
              </div>
            )}

            {!isLogin && (
              <div
                onClick={() => {
                  onClickOfpopUpOption("login");
                }}
                className="p-2 cursor-pointer hover:bg-gray-700"
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModel} />}
    </div>
  );
};

export default NavBar;
