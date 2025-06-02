import React, { useEffect, useState } from "react";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Video = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [comment, setComment] = useState([]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const [editMessage, setEditMessage] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { id } = useParams();
  const [userPic, setUserPic] = useState(
    "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
  );

  const fetchVideoById = () => {
    axios
      .get(`${API_BASE}/api/getvideobyid/${id}`)
      .then((res) => {
        setData(res?.data?.video);
        setVideoUrl(res?.data?.video?.videoLink);
      })
      .catch((err) => console.log(err));
  };

  const fetchCommentsById = () => {
    axios
      .get(`${API_BASE}/commentapi/comment/${id}`)
      .then((res) => {
        setComment(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const pic = localStorage.getItem("userProfilePic");
    if (pic) {
      setUserPic(pic);
    }
    fetchVideoById();
    fetchCommentsById();
  }, [comment]);

  const handleComment = async () => {
    try {
      const body = { message, videoId: id };
      if (message.trim() == "") return;
      const response = await axios.post(
        `${API_BASE}/commentapi/comment`,
        body,
        { withCredentials: true }
      );

      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error("please login first");
    }
  };

  const handleEditComment = (commentId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first to edit a comment!");
      return;
    }
    axios
      .put(
        `${API_BASE}/commentapi/comment/${commentId}`,
        { message: editMessage },
        { withCredentials: true }
      )
      .then((res) => {
        setComment((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, message: editMessage }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditMessage("");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteComment = (commentId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first to edit a comment!");
      return;
    }
    if (!commentId) {
      console.error("Comment ID is undefined. dfb g w w");
      return;
    }
    axios
      .delete(`${API_BASE}/commentapi/comment/${commentId}`, {
        withCredentials: true,
      })
      .then(() => {
        setComment((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mt-[56px] flex flex-col lg:flex-row py-8 justify-center bg-black text-white px-4">
      {/* Video Section */}
      <div className="w-full lg:w-3/4 flex flex-col px-4">
        {/* Video Player */}
        <div className="w-full max-w-2xl mx-auto">
          {data && (
            <video controls autoPlay className="w-full rounded-md">
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Video Title */}
        <div className="font-semibold text-lg mt-4">{data?.title}</div>

        {/* Profile Details */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            {/* Channel Profile */}
            <Link
              to={`/user/${data?.user?._id}`}
              className="w-12 h-12 cursor-pointer"
            >
              <img
                src={data?.user?.profilePic}
                alt="Channel Avatar"
                className="w-full h-full rounded-full"
              />
            </Link>

            <div className="flex flex-col">
              <span className="font-medium text-md">
                {data?.user?.channelName}
              </span>
              <span className="text-sm text-gray-400">
                {data?.user?.createdAt.slice(0, 10)}
              </span>
            </div>

            <button className="bg-red-600 text-white py-1 px-6 rounded-full text-sm font-semibold hover:bg-red-700 transition-all">
              Subscribe
            </button>
          </div>

          {/* Like & Dislike Buttons */}
          <div className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition">
            <div className="flex items-center gap-2">
              <ThumbUpIcon />
              <span className="font-medium">{data?.like}</span>
            </div>
            <div className="w-px h-5 bg-gray-500"></div>
            <ThumbDownAltIcon />
          </div>
        </div>

        {/* Video Description */}
        <div className="bg-gray-800 p-4 rounded-md mt-4">
          <span className="font-medium text-gray-300">
            Published: {data?.user?.createdAt.slice(0, 10)}
          </span>
          <p className="text-sm text-gray-400 mt-2 leading-6">
            {data?.description}
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-5">
          <h3 className="text-xl font-semibold">
            {comment.length}&nbsp;Comments
          </h3>

          {/* Add Comment */}
          <div className="flex mt-3 gap-3">
            <img
              src={userPic}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="w-full bg-black text-white border-b border-gray-600 focus:outline-none placeholder:font-medium text-sm p-2"
                placeholder="Add a comment..."
              />
              <div className="flex justify-end gap-4 mt-3">
                <button className="py-2 px-4 border text-white hover:bg-gray-700 transition-all rounded-md">
                  Cancel
                </button>
                <button
                  className="py-2 px-4 border text-white hover:bg-gray-700 transition-all rounded-md"
                  onClick={handleComment}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Existing Comments */}
          <div className="flex flex-col gap-3 mt-4">
            {comment.map((obj) => (
              <div key={obj._id} className="flex gap-6 justify-between">
                <div className="flex gap-2">
                  <img
                    src={obj?.user?.profilePic}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-3">
                      <span className="font-light text-sm">
                        {obj?.user?.userName}
                      </span>
                      <span className="text-sm text-gray-400">
                        {obj?.createdAt?.slice(0, 10)}
                      </span>
                    </div>
                    {editingCommentId === obj._id ? (
                      <input
                        type="text"
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        className="bg-gray-700 text-white p-1 rounded"
                      />
                    ) : (
                      <p className="text-sm text-gray-400 mt-2 leading-6">
                        {obj.message}
                      </p>
                    )}
                    {/* <p className="text-sm text-gray-400 mt-2 leading-6">
                    {obj?.message}
                  </p> */}
                  </div>
                </div>
                <div>
                  {editingCommentId === obj._id ? (
                    <button
                      className="ml-2 px-3 py-1 bg-blue-600 rounded"
                      onClick={() => handleEditComment(obj._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="ml-2 px-3 py-1 bg-yellow-500 rounded"
                      onClick={() => {
                        setEditingCommentId(obj._id);
                        setEditMessage(obj.message);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="ml-2 px-3 py-1 bg-red-600 rounded"
                    onClick={() => handleDeleteComment(obj._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="w-full lg:w-1/4 px-4 mt-8 lg:mt-0">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex gap-4 mb-4 cursor-pointer hover:bg-gray-900 p-2 rounded-lg transition-all"
          >
            <div className="w-36 h-20">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS93fEUuLwNdHyUqnwnvhw49BUnuuIqcxoNEw&s"
                alt="Suggested Video"
                className="w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="font-semibold text-sm">Video Title {index + 1}</h4>
              <span className="text-gray-400 text-xs">Channel Name</span>
              <span className="text-gray-500 text-xs">
                134K views • 2 years ago
              </span>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Video;
