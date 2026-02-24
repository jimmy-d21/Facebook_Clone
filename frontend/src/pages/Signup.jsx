import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-2xl w-full flex items-center gap-15">
        <img src="/facebook_logo.webp" alt="Facebook Logo" className="w-55" />
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-white">Join today.</h1>
          <div className="w-full flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
            />
            <div className="w-full grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Firstname"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
              <input
                type="text"
                placeholder="Lastname"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white font-semibold text-sm py-2.5 px-3 rounded-full cursor-pointer transition-transform hover:scale-101 active:scale-98">
            Signup
          </button>
          <span className="text-gray-400 text-md">
            Already have an account?
          </span>
          <button
            onClick={() => navigate("/signin")}
            className="border border-gray-300 font-semibold text-sm py-2.5 px-3 rounded-full text-white cursor-pointer transition-transform hover:scale-101 active:scale-98"
          >
            SignIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
