import React from "react";
import LeftSidebar from "../components/LeftSidebar";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center">
      <div className="w-full max-w-7xl flex">
        {/* Left SideBar */}
        <div className="flex-1 border-r border-gray-300">
          <LeftSidebar />
        </div>
        {/* Posts */}
        <div className="flex-4 ">Main Content</div>
        {/* Right SideBar */}
        <div className="flex-1 ">Right Sidebar</div>
      </div>
    </div>
  );
};

export default Home;
