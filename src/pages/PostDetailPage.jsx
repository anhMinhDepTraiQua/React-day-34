import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/CommentList";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Fetch bài post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await res.json();
        console.log("Post:", data);
        setPost(data);
      } catch (err) {
        console.error("Lỗi khi fetch post:", err);
      }
    };

    fetchPost();
  }, [id]);

  // Fetch bình luận
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const data = await res.json();

        // Thêm dữ liệu giả cho avatar + username
        const fakeAvatars = [
          "https://api.dicebear.com/7.x/thumbs/svg?seed=User1",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=User2",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=User3",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=User4",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=User5",
        ];

        const enriched = data.map((c, i) => ({
          ...c,
          username: `user_${i + 1}`,
          avatar: fakeAvatars[i % fakeAvatars.length],
        }));

        setComments(enriched);
      } catch (err) {
        console.error("Lỗi khi fetch comments:", err);
      }
    };

    fetchComments();
  }, [id]);

  // Hàm thêm bình luận mới (giả lập)
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newItem = {
      id: comments.length + 1,
      username: "you",
      avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=You",
      body: newComment,
    };

    setComments([newItem, ...comments]);
    setNewComment("");
    setIsModalOpen(false);
  };

  if (!post)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Đang tải bài viết...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-screen-md space-y-6">
        {/* Bài post chính */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-700 text-sm mb-4">{post.body}</p>

          <div className="flex justify-between text-gray-500 text-sm border-t pt-3">
            <span>ID: {post.id}</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:text-blue-600 transition"
            >
              💬 Bình luận
            </button>
          </div>
        </div>

        {/* Danh sách bình luận */}
        <CommentList comments={comments} />

        {/* Modal thêm bình luận */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-3">Thêm bình luận</h3>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
