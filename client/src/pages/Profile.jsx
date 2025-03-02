import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import LeftNav from "../Components/LeftNav";
const Profile = ({ sideNav }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const fetchProfileData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/${id}/channel`);

      console.log(res);

      if (res?.data?.videos.length < 1) {
        const result = await axios.get(
          `http://localhost:4000/auth/getUser/${id}`
        );
        console.log(result);
        setUser(result?.data);
      } else {
        setData(res.data.videos);
        setUser(res.data.videos[0]?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="flex w-full px-4 pt-2 bg-black text-white">
      {/* Sidebar (conditionally rendered) */}
      <LeftNav isOpen={sideNav} />
      <div
        className={`flex flex-col w-full transition-all ${
          sideNav ? "ml-[270px]" : "ml-14"
        } mt-14`}
      >
        {/* Profile Top Section */}
        <div className="w-full flex flex-col items-center py-6">
          {/* Profile Picture */}
          <div className="w-36 h-36">
            <img
              className="w-full h-full rounded-full object-cover"
              src={
                user?.profilePic ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRft4802rUkGEXsDETSJlqOfPv1ztMF7wmpBNp0xuXqx9KC1o8LnGYJkZtg46I6_LiU5hds&s"
              }
              alt="Profile"
            />
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center mt-4">
            <h1 className="text-3xl font-semibold">
              {user?.userName || "User Name"}
            </h1>
            <p className="text-gray-400 text-sm">
              Joined {user?.createdAt.slice(0, 10) || "2024-01-01"}
            </p>
            <p className="text-gray-400 text-sm">
              {user?.userName} | {data.length} videos
            </p>
            <p className="text-gray-400 text-sm">{user?.about}</p>
          </div>
        </div>

        {/* Videos Section */}
        <div className="w-full max-w-6xl mx-auto mt-6">
          <div className="text-xl font-medium text-gray-300 border-b border-gray-600 pb-2 flex items-center">
            Videos &nbsp;
            <ArrowRightIcon />
          </div>

          {/* Video Grid */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {data.map((item, key) => (
              <Link
                key={key}
                to={`/watch/${item._id}`}
                className="w-52 text-white cursor-pointer text-decoration-none transition-transform transform hover:scale-105"
              >
                {/* Video Thumbnail */}
                <div className="w-full h-32 bg-gray-800 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={item?.thumbnail || "https://via.placeholder.com/200"}
                    alt="Video Thumbnail"
                  />
                </div>

                {/* Video Details */}
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-medium truncate">
                    {item?.title || "Video Title"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item?.views || 0} views •{" "}
                    {item?.createdAt.slice(0, 10) || "Unknown Date"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
