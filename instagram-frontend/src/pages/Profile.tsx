import {
  Grid,
  Bookmark,
  Heart,
  MessageCircle,
  SquareUser,
  Cog,
} from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "../components/modals/SettingsModal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Mock data for the grid
  const posts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    image: `https://i.pravatar.cc/150?img=${i + 10}`,
    likes: 120 + i * 10,
    comments: 20 + i,
  }));

  const navigate = useNavigate();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 pt-8">
      {/* Header Section */}
      <header className="flex flex-row items-center gap-8 md:gap-20 mb-12">
        <div className="w-20 h-20 md:w-40 md:h-40 rounded-full bg-gray-800 overflow-hidden">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-xl font-light">my_creative_life</h2>
            <button
              className="bg-[#efefef] hover:bg-[#dbdbdb] text-black px-4 py-1.5 rounded-lg text-sm font-semibold transition"
              onClick={handleEditProfile}
            >
              Edit profile
            </button>
            <button className="bg-[#efefef] hover:bg-[#dbdbdb] text-black px-4 py-1.5 rounded-lg text-sm font-semibold transition">
              View archive
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1 hover:text-gray-400 transition cursor-pointer"
            >
              <Cog size={24} />
            </button>
          </div>

          <div className="hidden md:flex gap-10">
            <span>
              <strong>12</strong> posts
            </span>
            <span>
              <strong>250</strong> followers
            </span>
            <span>
              <strong>300</strong> following
            </span>
          </div>

          <div>
            <span className="font-semibold">John Doe</span>
            <p className="text-sm">
              Building cool things with React & GraphQL 🚀
            </p>
          </div>
        </section>
      </header>

      {/* --- STORY HIGHLIGHTS (Optional placeholder) --- */}
      <div className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide">
        {/* Repeat Story circles here if needed */}
      </div>

      {/* --- TABS --- */}
      <div className="flex justify-center gap-12 text-xs font-semibold tracking-widest text-gray-500 mb-2">
        <button className="flex items-center gap-2 border-b-2 cursor-pointer border-white text-white px-4 py-2 -mt-px">
          <Grid size={24} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:text-white transition">
          <Bookmark size={24} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:text-white transition">
          <SquareUser size={24} />
        </button>
      </div>

      {/* --- IMAGE GRID --- */}
      <div className="grid grid-cols-3 gap-1 md:gap-7">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square group cursor-pointer bg-gray-900"
          >
            <img
              src={post.image}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center gap-6 text-white font-bold">
              <div className="flex items-center gap-1">
                <Heart className="fill-white" size={20} />
                {post.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="fill-white" size={20} />
                {post.comments}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SETTINGS MODAL */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Profile;
