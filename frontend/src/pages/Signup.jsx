import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { fetchSignUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const data = await fetchSignUp(
      email,
      firstname,
      lastname,
      password,
      confirmPassword,
    );
    if (!data.error) {
      setEmail("");
      setFirstname("");
      setLastname("");
      setPassword("");
      setConfirmPassword("");

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-2xl w-full flex items-center gap-15">
        <img src="/facebook_logo.webp" alt="Facebook Logo" className="w-55" />
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-white">Join today.</h1>
          <div className="w-full flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              z
              value={email}
              type="email"
              placeholder="Email"
              className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
            />
            <div className="w-full grid grid-cols-2 gap-3">
              <input
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                type="text"
                placeholder="Firstname"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
              <input
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                type="text"
                placeholder="Lastname"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-100 text-sm outline-none font-light"
              />
            </div>
          </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-600 text-white font-semibold text-sm py-2.5 px-3 rounded-full cursor-pointer transition-transform hover:scale-101 active:scale-98"
          >
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
