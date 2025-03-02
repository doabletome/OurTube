import React from "react";
import {
  Home as HomeIcon,
  VideoCameraFront as VideoCameraFrontIcon,
  Subscriptions as SubscriptionsIcon,
  ChevronRight as ChevronRightIcon,
  Contacts as ContactsIcon,
  History as HistoryIcon,
  PlaylistPlay as PlaylistPlayIcon,
  WatchLater as WatchLaterIcon,
  ThumbUp as ThumbUpIcon,
  Videocam as VideocamIcon,
  ContentCut as ContentCutIcon,
} from "@mui/icons-material";

const LeftNav = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-60" : "w-16"
      } h-full bg-gray-900 text-white fixed top-14 left-0 transition-all duration-300 ease-in-out z-10 p-2 overflow-y-auto`}
    >
      <div className="flex flex-col border-b border-gray-600 pb-2">
        {[
          { icon: <HomeIcon />, label: "Home" },
          { icon: <VideoCameraFrontIcon />, label: "Shorts" },
          { icon: <SubscriptionsIcon />, label: "Subscriptions" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-800"
          >
            {item.icon}
            {isOpen && (
              <span className="text-lg font-normal">{item.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col border-b border-gray-600 pb-2">
        {[
          { icon: <ContactsIcon />, label: "Your Channel" },
          { icon: <HistoryIcon />, label: "History" },
          { icon: <PlaylistPlayIcon />, label: "Playlists" },
          { icon: <VideocamIcon />, label: "Your Videos" },
          { icon: <WatchLaterIcon />, label: "Watch Later" },
          { icon: <ThumbUpIcon />, label: "Liked Videos" },
          { icon: <ContentCutIcon />, label: "Your Clips" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-800"
          >
            {item.icon}
            {isOpen && (
              <span className="text-lg font-normal">{item.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col border-b border-gray-600 pb-2">
        {[
          {
            img: "https://play-lh.googleusercontent.com/BUuYJQrTI1z5tKXXAAwiFX86vw-cfBwKcLklhvhhDqTlda8zfqEJZkbUoXcRHUZ6dyQ=w600-h300-pc0xffffff-pd",
            label: "Aaj Tak",
          },
          {
            img: "https://yt3.googleusercontent.com/OZXhQ0ekBJseGOgV00O0czWxMxp3cy1fKJ8KH5lh7FY9NOlx2elF6KraO-hISusYuHZQVz9f=s160-c-k-c0x00ffffff-no-rj",
            label: "DeshBhakt",
          },
          {
            img: "https://www.aljazeera.com/wp-content/uploads/2025/02/2025-02-23T162755Z_1848580782_UP1EL2N19QHRZ_RTRMADP_3_CRICKET-CHAMPIONSTROPHY-IND-PAK-1740330694.jpg?resize=570%2C380&quality=80",
            label: "Virat",
          },
        ].map((obj, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-800"
            >
              <img src={obj.img} alt="Logo" className="h-8 w-8 rounded-full" />
              {isOpen && (
                <span className="text-lg font-normal">{obj.label}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftNav;
