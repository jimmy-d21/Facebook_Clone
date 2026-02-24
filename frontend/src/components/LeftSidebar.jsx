import React, { useContext } from "react";
import { MdHome } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LeftSidebar = () => {
  const { authUser, fetchLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetchLogout();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      {/* Top section */}
      <div className="w-full flex flex-col gap-5 pt-3">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src="/facebook_logo.webp"
          alt="Facebook Logo"
          className="w-12 md:w-15 mx-auto md:mx-0 cursor-pointer"
        />

        {/* Navigation links */}
        <div className="w-full flex flex-col">
          {/* Home */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 py-3 px-2 cursor-pointer 
                       transition-colors duration-300 hover:bg-gray-700 rounded-md"
          >
            <MdHome size={25} className="text-gray-300" />
            <span className="hidden sm:inline text-sm md:text-md text-gray-300">
              Home
            </span>
          </div>

          {/* Notifications */}
          <div
            onClick={() => navigate("/notifications")}
            className="flex items-center gap-3 py-3 px-2 cursor-pointer 
                       transition-colors duration-300 hover:bg-gray-700 rounded-md"
          >
            <div className="relative">
              <FaBell size={25} className="text-gray-300" />
              <div
                className="absolute -top-1 -right-2 rounded-full w-5 h-5 
                              flex items-center justify-center text-xs text-white 
                              font-semibold bg-red-600"
              >
                11
              </div>
            </div>
            <span className="hidden sm:inline text-sm md:text-md text-gray-300">
              Notifications
            </span>
          </div>

          {/* Profile */}
          <div
            onClick={() => navigate(`/profile/${authUser?.id}`)}
            className="flex items-center gap-3 py-3 px-2 cursor-pointer 
                       transition-colors duration-300 hover:bg-gray-700 rounded-md"
          >
            <FaUser size={25} className="text-gray-300" />
            <span className="hidden sm:inline text-sm md:text-md text-gray-300">
              Profile
            </span>
          </div>
        </div>
      </div>

      {/* Bottom user section */}
      <div className="w-full pb-6 flex items-center gap-3 px-3">
        <img
          src={authUser?.profile_picture}
          alt="Profile Picture"
          className="w-8 h-8 rounded-full"
        />
        <div className="hidden sm:flex flex-1 flex-col gap-1">
          <span className="text-xs text-white font-semibold truncate">
            @{authUser?.firstname + " " + authUser?.lastname}
          </span>
        </div>
        <div
          onClick={handleLogout}
          className="w-8 h-8 md:w-10 md:h-10 p-2 rounded-full bg-transparent 
                     cursor-pointer transition-colors duration-300 hover:bg-gray-600"
        >
          <RiLogoutBoxLine className="w-full h-full text-white" />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
