import React from "react";
import LeftNav from "../Components/LeftNav";
import HomePage from "./HomePage";

const Home = ({ sideNav }) => {
  return (
    <div className="flex  ">
      <LeftNav isOpen={sideNav} />

      <div
        className={`flex-grow transition-all ${
          sideNav ? "ml-56" : "ml-12"
        } p-4`}
      >
        <HomePage isOpen={sideNav} />
      </div>
    </div>
  );
};

export default Home;
