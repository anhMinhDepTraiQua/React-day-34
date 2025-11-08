import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("threads");
  const [loading, setLoading] = useState(true);

  // Map username → userId (demo)
  const userMap = {
    user_1: 1,
    user_2: 2,
    user_3: 3,
    user_4: 4,
    user_5: 5,
  };

  const userId = userMap[username] || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`),
        ]);
        const userData = await userRes.json();
        const postsData = await postsRes.json();

        // Gắn dữ liệu giả
        const fakePosts = postsData.slice(0, 5).map((p) => ({
          ...p,
          avatar: `https://i.pravatar.cc/150?img=${userId}`,
          username: username,
          timeAgo: "2h",
          metrics: {
            likes: Math.floor(Math.random() * 100),
            comments: Math.floor(Math.random() * 50),
            reposts: Math.floor(Math.random() * 20),
            shares: Math.floor(Math.random() * 10),
          },
        }));

        setUser({
          ...userData,
          avatar: `https://i.pravatar.cc/150?img=${userId}`,
          bio: "Building cool stuff with React ⚡",
          followers: Math.floor(Math.random() * 1000),
        });
        setPosts(fakePosts);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (loading) return <div className="text-center p-6">Loading profile...</div>;
  if (!user) return <div className="text-center p-6">User not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-24 h-24 rounded-full mb-3 border-4 border-gray-200 object-cover"
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500 mb-1">@{username}</p>
        <p className="text-sm text-gray-600 mb-3">{user.bio}</p>
        <div className="flex gap-6 mb-3">
          <span className="text-sm text-gray-600">
            <strong>{user.followers}</strong> Followers
          </span>
          <span className="text-sm text-gray-600">
            <strong>{Math.floor(user.followers / 2)}</strong> Following
          </span>
        </div>
        <button className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition">
          Follow
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b border-gray-200 mb-4 text-sm">
        {["threads", "replies", "media", "reposts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "threads" && (
          <div className="space-y-4">
            {posts.map((p) => (
              <PostItem key={p.id} post={p} />
            ))}
          </div>
        )}
        {activeTab === "replies" && (
          <div className="text-center text-gray-500 py-10">
            No replies yet.
          </div>
        )}
        {activeTab === "media" && (
          <div className="text-center text-gray-500 py-10">
            No media uploaded.
          </div>
        )}
        {activeTab === "reposts" && (
          <div className="text-center text-gray-500 py-10">
            No reposts yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
