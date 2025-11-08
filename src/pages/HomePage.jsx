import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();

        const fakeUsers = [
          "threads_user_1",
          "threads_user_2",
          "threads_user_3",
          "threads_user_4",
          "threads_user_5",
        ];

        const fakeAvatars = [
          "https://api.dicebear.com/7.x/thumbs/svg?seed=Ava1",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=Ava2",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=Ava3",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=Ava4",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=Ava5",
        ];

        const enriched = data.slice(0, 5).map((post, i) => ({
          ...post,
          username: fakeUsers[i % fakeUsers.length],
          avatar: fakeAvatars[i % fakeAvatars.length],
          timeAgo: ["2h", "5h", "1d", "3d", "1w"][i % 5],
          metrics: {
            likes: Math.floor(Math.random() * 500),
            comments: Math.floor(Math.random() * 100),
            reposts: Math.floor(Math.random() * 50),
            shares: Math.floor(Math.random() * 20),
          },
        }));

        setPosts(enriched);
      } catch (error) {
        console.error("Lỗi khi fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-screen-md space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Threads Feed</h1>

        {posts.length === 0 ? (
          <div className="p-6 bg-white rounded-xl shadow text-center text-gray-500">
            Đang tải bài đăng...
          </div>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
