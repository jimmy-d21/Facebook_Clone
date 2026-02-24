import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextPorivder from "./context/AuthContext.jsx";
import PostContextProvider from "./context/PostContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextPorivder>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthContextPorivder>
  </BrowserRouter>,
);
