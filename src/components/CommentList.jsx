import React from "react";

const CommentList = ({ comments }) => {
  if (!comments.length)
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center text-gray-500">
        Chưa có bình luận nào.
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="text-lg font-semibold mb-4">Bình luận ({comments.length})</h3>
      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-none"
          >
            <img
              src={c.avatar}
              alt={c.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-sm">{c.username}</h4>
              <p className="text-sm text-gray-700">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
