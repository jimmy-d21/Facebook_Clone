import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import PostsContainer from "../components/PostsContainer";

const Home = () => {
  const [feedPosts, setFeedPosts] = useState("for you");

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center">
      <div className="w-full max-w-7xl flex">
        {/* Left SideBar */}
        <div className="flex-1">
          <LeftSidebar />
        </div>

        {/* Posts */}
        <div className="flex-[4] flex flex-col border-x border-gray-600">
          {/* Tabs */}
          <div className="flex items-center justify-between py-3 border-b border-gray-600">
            {/* For You */}
            <div
              onClick={() => setFeedPosts("for you")}
              className="w-full text-center text-gray-400 text-xs md:text-sm cursor-pointer"
            >
              <span
                className={`pb-1 ${
                  feedPosts === "for you"
                    ? "border-b-2 border-blue-600 text-white font-semibold"
                    : ""
                }`}
              >
                For You
              </span>
            </div>

            {/* Following */}
            <div
              onClick={() => setFeedPosts("following")}
              className="w-full text-center text-gray-400 text-xs md:text-sm cursor-pointer"
            >
              <span
                className={`pb-1 ${
                  feedPosts === "following"
                    ? "border-b-2 border-blue-600 text-white font-semibold"
                    : ""
                }`}
              >
                Following
              </span>
            </div>
          </div>
          <PostsContainer feedPosts={feedPosts} />
        </div>

        {/* Right SideBar */}
        <div className="flex-1">Right Sidebar</div>
      </div>
    </div>
  );
};

export default Home;
