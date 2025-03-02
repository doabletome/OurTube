import React, { useState, useEffect } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });
  console.log(inputField);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      setTimeout(() => {
        navigate("/");
      }, 1000);

      toast.warning("You have to login to Upload Video");
    }
  }, []);

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    const files = e.target.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");
    try {
      // Upload image/video to Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dtwunusjp/${type}/upload`,
        data
      );
      if (type === "image") {
        setInputField({ ...inputField, thumbnail: res.data.secure_url });
      } else {
        setInputField({ ...inputField, videoLink: res.data.secure_url });
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const handleSubmitFunc = async () => {
    setLoader(true);
    if (!inputField.title || !inputField.videoLink || !inputField.thumbnail) {
      toast.error("Please fill in all required fields!");
      return;
    }
    try {
      const resp = await axios.post(
        "http://localhost:4000/api/video",
        inputField,
        {
          withCredentials: true,
        }
      );
      console.log(resp);
      setLoader(false);
      navigate("/");
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
    // console.log("Uploading Video:", inputField);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-black text-white pt-16">
      {/* Upload Box */}
      <div className="w-full sm:w-3/5 md:w-2/5 bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center">
        {/* Title */}
        <div className="flex items-center gap-3 text-3xl font-semibold">
          <YouTubeIcon sx={{ fontSize: "50px" }} className="text-red-600" />
          Upload Video
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-5 mt-5 w-full items-center">
          <input
            type="text"
            placeholder="Video Title"
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, "title")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none"
          />
          <textarea
            placeholder="Video Description"
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, "description")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none h-24 resize-none"
          />
          <select
            value={inputField.videoType}
            onChange={(e) => handleOnChangeInput(e, "videoType")}
            className="w-3/4 bg-gray-800 text-white p-3 rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select Video Type
            </option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Gaming">Gaming</option>
            <option value="Other">Other</option>
          </select>

          {/* Upload Thumbnail & Video */}
          <div className="w-3/4 flex flex-col gap-2">
            <label className="text-sm text-gray-400">Upload Thumbnail:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e, "image")}
              className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="w-3/4 flex flex-col gap-2">
            <label className="text-sm text-gray-400">Upload Video:</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => uploadImage(e, "video")}
              className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Loader */}
        {loader && (
          <div className="w-full flex justify-center mt-3">
            <CircularProgress />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between w-3/4 mt-6">
          <button
            className="w-1/3 border border-white py-2 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all"
            onClick={handleSubmitFunc}
          >
            Upload
          </button>
          <Link
            to={"/"}
            className="w-1/3 border border-white py-2 rounded-md text-lg font-semibold flex justify-center items-center hover:bg-white hover:text-black transition-all"
          >
            Home
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VideoUpload;
