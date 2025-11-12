import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/Navigation";
import ActivityPage from "./pages/ActivityPage";
import FollowingPage from "./pages/FollowingPage";
import GhostPostPage from "./pages/GhostPostsPage";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
  <BrowserRouter basename="/React-day-34">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ActivityPage" element={<ActivityPage />} />
        <Route path="/FollowingPage" element={<FollowingPage />} />
        <Route path="/GhostPostPage" element={<GhostPostPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
