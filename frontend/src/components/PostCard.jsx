import React from "react";
import { formatTimeAgo } from "../utils/formatTime";
import { TbMessageCircle } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PostCard = ({ post }) => {
  const { authUser } = useContext(AuthContext);

  const isLiked = post?.post?.likes.includes(authUser?.id.toString());

  return (
    <div className="w-full flex gap-5 p-5 border-b border-gray-600">
      <img
        src={post?.user?.profile_picture}
        alt="Profile Picture"
        className="w-8 h-8 rounded-full"
      />
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-white text-xs font-semibold">
            {post?.user?.fullname}
          </span>
          <span className="text-gray-600 text-xs font-semibold">
            @{post?.user?.email}
          </span>
          <span className="text-gray-600 text-xs font-semibold">
            {formatTimeAgo(post?.post?.created_at)}
          </span>
        </div>
        <div className="w-full flex flex-col gap-3">
          {post?.post?.text && (
            <p className="text-gray-300 text-sm font-medium">
              {post?.post?.text}
            </p>
          )}
          {post?.post?.image && (
            <div className="w-full py-3 flex items-center justify-center border border-gray-600 rounded-md">
              <img
                src={post?.post?.image}
                alt="Post Image"
                className="w-50 h-50 rounded-sm object-fill"
              />
            </div>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1 cursor-pointer">
            <TbMessageCircle
              size={20}
              className="text-gray-600 font-semibold"
            />
            <span className="text-gray-600 font-semibold text-sm">
              {post?.post?.comments}
            </span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <BiRepost size={25} className="text-gray-600" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <FaHeart
              size={16}
              className={`font-semibold ${isLiked ? "text-pink-600" : "text-gray-600"}`}
            />
            <span
              className={`font-semibold text-sm ${isLiked ? "text-pink-600" : "text-gray-600"}`}
            >
              {post?.post?.likes.length}
            </span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <FaRegBookmark size={20} className="text-gray-600 font-semibold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
