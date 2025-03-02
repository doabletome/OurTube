import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = ({ isOpen }) => {
  const [data, setData] = useState([]);
  const option = [
    "All",
    "Twenty20",
    "Movies",
    "Series",
    "Comedy",
    "Erotic",
    "Fantasy",
    "News",
    "World",
    "Mixes",
    "American",
    "Food",
    "Sports",
    "Scifi",
    "Naruto",
    "Anime",
    "Discovery",
    "Dragon",
    "Science",
    "Thriller",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allvideo")
      .then((res) => {
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 h-min-full mt-14 bg-black px-4">
      {/* Scrollable Filter Bar */}
      <div className="flex items-center overflow-x-auto fixed top-14 z-10 w-full gap-2 whitespace-nowrap bg-black py-2 px-4 [&::-webkit-scrollbar]:h-1">
        {option.map((op, index) => (
          <div
            key={index}
            className="text-white flex-none h-8 py-1 px-3 bg-gray-800 font-semibold rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-900 transition"
          >
            {op}
          </div>
        ))}
      </div>

      {/* Video Grid Section */}
      <div
        className={`grid gap-4 pt-12 pb-5 bg-black transition-all
          ${
            isOpen
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          }
        `}
      >
        {data?.map((obj, index) => {
          return (
            <Link
              to={`/watch/${obj._id}`}
              key={obj._id}
              className="text-white flex flex-col cursor-pointer h-[320px] transition hover:scale-105"
            >
              {/* Video Thumbnail */}
              <div className="relative w-full h-[216px] rounded-lg overflow-hidden">
                <img
                  src={obj?.thumbnail}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded-md">
                  19:00
                </div>
              </div>

              {/* Video Details */}
              <div className="flex pt-3 gap-3">
                {/* Channel Avatar */}
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={obj?.user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt="Avatar"
                  />
                </div>

                {/* Video Info */}
                <div className="flex flex-col w-full">
                  <div className="font-semibold text-md truncate">
                    {obj?.title}
                  </div>
                  <div className="font-light text-sm text-gray-400">
                    {obj?.user?.channelName}
                  </div>
                  <div className="font-light text-xs text-gray-500">
                    {obj?.like} &nbsp; Likes
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
