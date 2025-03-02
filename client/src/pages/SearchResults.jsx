import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import LeftNav from "../Components/LeftNav";

const SearchResults = ({ sideNav }) => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`http://localhost:4000/api/search?query=${searchQuery}`)
        .then((res) => setVideos(res.data.videos))
        .catch((err) => console.error(err));
    }
  }, [searchQuery]);

  return (
    <>
      <div className="flex  ">
        <LeftNav isOpen={sideNav} />
        <div
          className={`flex-grow transition-all ${
            sideNav ? "ml-56" : "ml-12"
          } p-4`}
        >
          <div className="min-h-screen bg-black text-white px-6 mt-14">
            <h2 className="text-2xl mb-4 font-semibold">
              Search Results for "{searchQuery}"
            </h2>

            <div
              className={`grid gap-4 ${
                sideNav ? "grid-cols-3" : "grid-cols-4"
              } pt-12 pb-5`}
            >
              {videos.length > 0 ? (
                videos.map((video) => (
                  <Link
                    to={`/watch/${video._id}`}
                    key={video._id}
                    className="text-white flex flex-col cursor-pointer h-[316px]"
                  >
                    {/* Thumbnail */}
                    <div className="w-full relative h-[216px]">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full rounded-md"
                      />
                      <div className="absolute bottom-1 right-1 bg-gray-900 text-white text-xs px-1 py-0.5 rounded">
                        19:00
                      </div>
                    </div>

                    {/* Video Details */}
                    <div className="flex pt-2.5">
                      {/* Channel Profile */}
                      <div className="w-13 h-13 flex items-center justify-center">
                        <img
                          src={video.user.profilePic}
                          alt={video.user.channelName}
                          className="w-[80%] rounded-full"
                        />
                      </div>

                      {/* Video Info */}
                      <div className="flex flex-col w-full p-1.5">
                        <h3 className="font-semibold text-md">{video.title}</h3>
                        <p className="text-gray-400 text-sm">
                          {video.user.channelName}
                        </p>
                        <p className="text-gray-400 text-xs">44 likes</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-400">
                  No videos found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
