import {
  Grid,
  Bookmark,
  Heart,
  MessageCircle,
  SquareUser,
  Cog,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "../components/modals/SettingsModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@apollo/client/react";
import type { ProfilePostsData } from "../types/post";
import { GET_PROFILE_POSTS } from "../graphql/queries/post";

const Profile = () => {
  const { authUser, authUserLoading } = useAuth();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { loading, error, data } = useQuery<ProfilePostsData>(
    GET_PROFILE_POSTS,
    {
      variables: { profileId: authUser?.getProfile.id, limit: 20, offset: 0 },
      skip: !authUser?.getProfile.id,
    }
  );

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (authUserLoading)
    return (
      <div className="flex justify-center pt-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-3xl w-full mx-auto px-4 pt-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <header className="flex flex-row items-center gap-8 md:gap-12">
          <div className="w-20 h-20 md:w-30 md:h-30 rounded-full bg-gray-800 overflow-hidden">
            <img
              src={authUser?.getProfile.avatarUrl || "/ig-default.jpg"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <section className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-2xl font-bold">
                {authUser?.getProfile.username}
              </h2>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-1 hover:text-gray-400 transition cursor-pointer"
              >
                <Cog size={24} />
              </button>
            </div>
            <h1 className="text-sm font-normal">
              {authUser?.getProfile.displayName}
            </h1>
            <div className="hidden md:flex gap-10">
              <span className="text-sm">
                <strong>12</strong> posts
              </span>
              <span className="text-sm">
                <strong>250</strong> followers
              </span>
              <span className="text-sm">
                <strong>300</strong> following
              </span>
            </div>
          </section>
        </header>

        {/* Bio Section */}
        <p className="text-sm">{authUser?.getProfile.bio}</p>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex gap-4">
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white p-1.5 md:p-3 rounded-lg md:rounded-xl text-sm font-semibold transition cursor-pointer"
            onClick={handleEditProfile}
          >
            Edit profile
          </button>
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-1.5 md:p-3 rounded-lg md:rounded-xl text-sm font-semibold transition cursor-pointer">
            View archive
          </button>
        </div>

        {/* --- STORY HIGHLIGHTS (Optional placeholder) --- */}
        <div className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide">
          {/* Repeat Story circles here if needed */}
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="grid grid-cols-3 place-items-center">
        <button className="px-6 py-2 cursor-pointer text-white border-white border-b-2 transition">
          <Grid size={24} />
        </button>
        <button className="px-6 py-2 cursor-pointer text-gray-400 hover:text-white transition">
          <Bookmark size={24} />
        </button>
        <button className="px-6 py-2 cursor-pointer text-gray-400 hover:text-white transition">
          <SquareUser size={24} />
        </button>
      </div>

      {/* --- IMAGE GRID --- */}
      {loading && (
        <div className="flex w-full justify-center pt-20 text-white">
          Loading posts...
        </div>
      )}

      {error && (
        <div className="flex w-full justify-center pt-20 text-red-500">
          Error: {error.message}
        </div>
      )}

      <div className="grid grid-cols-3 gap-0.5">
        {data?.getProfilePosts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square group cursor-pointer bg-gray-900"
          >
            <img
              src={post.imageUrl}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center gap-6 text-white font-bold">
              <div className="flex items-center gap-1">
                <Heart className="fill-white" size={20} />
                {12}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="fill-white" size={20} />
                {3}
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
