// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const fetchSignUp = async (
    email,
    firstname,
    lastname,
    password,
    confirmPassword,
  ) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        email,
        firstname,
        lastname,
        password,
        confirmPassword,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success(data.message || "Signup successful!");

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Signup failed. Please try again.",
      );
    }
  };

  const values = {
    fetchSignUp,
    authUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
