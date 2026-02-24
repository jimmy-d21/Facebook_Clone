import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
