import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
} from "lucide-react";

const PostItem = ({ post }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar → link tới profile */}
        <Link to={`/profile/${post.username}`}>
          <img
            src={post.avatar}
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition"
          />
        </Link>

        {/* Username + time */}
        <div className="flex flex-col">
          <Link
            to={`/profile/${post.username}`}
            className="font-semibold text-sm hover:underline"
          >
            {post.username}
          </Link>
          <span className="text-xs text-gray-400">{post.timeAgo} ago</span>
        </div>
      </div>

      {/* Body — click để mở chi tiết post */}
      <Link to={`/post/${post.id}`}>
        <div className="mb-4 cursor-pointer">
          <h2 className="font-semibold text-lg mb-1 hover:underline">
            {post.title}
          </h2>
          <p className="text-sm text-gray-600">{post.body}</p>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex justify-between border-t border-gray-200 pt-3 text-sm text-gray-500">
        <button className="flex items-center gap-1 hover:text-red-500 transition">
          <Heart className="w-4 h-4" /> {post.metrics.likes}
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500 transition">
          <MessageCircle className="w-4 h-4" /> {post.metrics.comments}
        </button>
        <button className="flex items-center gap-1 hover:text-green-500 transition">
          <Repeat2 className="w-4 h-4" /> {post.metrics.reposts}
        </button>
        <button className="flex items-center gap-1 hover:text-yellow-500 transition">
          <Share2 className="w-4 h-4" /> {post.metrics.shares}
        </button>
      </div>
    </div>
  );
};

export default PostItem;
