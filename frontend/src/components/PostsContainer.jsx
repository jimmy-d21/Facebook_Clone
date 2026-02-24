import React from "react";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

const PostsContainer = ({ feedPosts, id }) => {
  const { fetchFeedPosts, posts } = useContext(PostContext);
  const getFeedPosts = () => {
    switch (feedPosts) {
      case "for you":
        return "/api/posts/all-posts";
      case "following":
        return "/api/posts/following-posts";
      case "owner post":
        return `/api/posts/${id}`;
      case "likes":
        return `/api/posts/liked/${id}`;
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      const url = getFeedPosts();
      await fetchFeedPosts(url);
    };
    loadPost();
  }, [feedPosts, id]);

  console.log(posts);

  return (
    <div className="w-full h-full flex flex-col">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;
