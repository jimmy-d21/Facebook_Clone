import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { fetchAuthUser, authUser } = useContext(AuthContext);

  useEffect(() => {
    const loadUser = async () => {
      await fetchAuthUser();
    };
    loadUser();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!authUser ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/signin" />}
        />
      </Routes>
    </>
  );
};

export default App;
