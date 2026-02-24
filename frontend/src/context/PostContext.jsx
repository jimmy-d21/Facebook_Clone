import { createContext } from "react";
import axiosInstance from "../utils/axios";
import { useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [posts, setAllPosts] = useState([]);
  const fetchFeedPosts = async (url) => {
    try {
      const { data } = await axiosInstance.get(url);
      setAllPosts(data);
    } catch (error) {}
  };
  const values = { fetchFeedPosts, posts };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
