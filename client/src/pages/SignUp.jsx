import React, { useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;

const SignUp = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const defaultProfilePic =
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain";
  const [uploadedImageUrl, setUploadedImageUrl] = useState(defaultProfilePic);
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e) => {
    setProgressBar(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `${CLOUDINARY_API_URL}/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );

      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({ ...signUpField, profilePic: imageUrl });
    } catch (err) {
      console.log(err);
      setProgressBar(false);
    }
  };

  const handleSignup = async () => {
    if (
      !signUpField.userName ||
      !signUpField.password ||
      !signUpField.channelName
    ) {
      toast.error("All fields are required!");
      return;
    }
    setProgressBar(true);

    axios
      .post(`${API_BASE}/auth/signup`, signUpField)
      .then((res) => {
        toast.success("Signup successful!");
        setProgressBar(false);
        setTimeout(() => {
          navigate("/login");
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        setProgressBar(false);
      });

    // Call API to create user (implement backend logic here)
    // console.log("Signing Up:", signUpField);
    // toast.success("Signup successful!");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-black text-white pt-16">
      {/* Sign Up Card */}
      <div className="w-full sm:w-3/5 md:w-2/5 bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center">
        {/* Title */}
        <div className="flex items-center gap-3 text-3xl font-semibold">
          <YouTubeIcon sx={{ fontSize: "50px" }} className="text-red-600" />
          Sign Up
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-5 mt-5 w-full items-center">
          <input
            type="text"
            placeholder="Channel Name"
            value={signUpField.channelName}
            onChange={(e) => handleInputField(e, "channelName")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none"
          />
          <input
            type="text"
            placeholder="Username"
            value={signUpField.userName}
            onChange={(e) => handleInputField(e, "userName")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpField.password}
            onChange={(e) => handleInputField(e, "password")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none"
          />
          <textarea
            placeholder="About Channel"
            value={signUpField.about}
            onChange={(e) => handleInputField(e, "about")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none h-24 resize-none"
          />

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center gap-3 w-3/4">
            <label className="text-sm text-gray-400">
              Upload Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none"
            />
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={uploadedImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Loader */}
        {progressBar && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between w-3/4 mt-6">
          <button
            className="w-1/3 border border-white py-2 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <Link
            to={"/"}
            className="w-1/3 border border-white py-2 rounded-md text-lg font-semibold flex justify-center items-center hover:bg-white hover:text-black transition-all"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
