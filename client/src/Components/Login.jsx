import React, { useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Login = ({ setLoginModal }) => {
  const navigate = useNavigate();

  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [loader, setLoader] = useState(false);

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  // const handleLoginFun = async () => {
  //   setLoader(true);
  //   axios
  //     .post("http://localhost:4000/auth/login", loginField, {
  //       withCredentials: true,
  //     })
  //     .then((resp) => {
  //       setLoader(false);

  //       localStorage.setItem("token", resp.data.token);
  //       localStorage.setItem("userId", resp.data.user._id);
  //       localStorage.setItem("userProfilePic", resp.data.user.profilePic);
  //       window.location.reload();
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 200);
  //     })
  //     .catch((err) => {
  //       toast.error("Invalid Credentials");
  //       console.log(err);
  //       setLoader(false);
  //     });
  // };

  const handleLoginFun = async () => {
    setLoader(true);
    axios
      .post("http://localhost:4000/auth/login", loginField, {
        withCredentials: true,
      })
      .then((resp) => {
        setLoader(false);

        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("userId", resp.data.user._id);
        localStorage.setItem("userProfilePic", resp.data.user.profilePic);

        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Invalid Credentials");
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <div className="w-full h-full fixed top-8 flex justify-center items-center bg-black/60 text-white">
      <div className="w-full sm:w-3/5 md:w-2/5 bg-black p-10 rounded-lg shadow-lg flex flex-col items-center">
        {/* Title Section */}
        <div className="flex items-center gap-3 text-3xl font-semibold">
          <YouTubeIcon sx={{ fontSize: "50px" }} className="text-red-600" />
          Login
        </div>

        {/* Login Fields */}
        <div className="flex flex-col gap-5 mt-5 w-full items-center">
          <input
            type="text"
            placeholder="Username"
            value={loginField.userName}
            onChange={(e) => handleOnChangeInput(e, "userName")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginField.password}
            onChange={(e) => handleOnChangeInput(e, "password")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between w-3/4 mt-6 gap-2">
          <button
            className="w-1/3 border border-white py-2 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all"
            onClick={handleLoginFun}
          >
            Login
          </button>
          <Link
            to={"/signup"}
            onClick={() => setLoginModal(false)}
            className="w-1/3 border border-white py-2 rounded-md text-lg font-semibold flex justify-center items-center hover:bg-white hover:text-black transition-all"
          >
            Sign Up
          </Link>
          <button
            className="w-1/3 border border-white py-2 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all"
            onClick={() => setLoginModal(false)}
          >
            Cancel
          </button>
        </div>

        {/* Loader */}
        {loader && (
          <Box sx={{ width: "100%" }}>
            {" "}
            <LinearProgress />
          </Box>
        )}
      </div>

      {/* Toast for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
