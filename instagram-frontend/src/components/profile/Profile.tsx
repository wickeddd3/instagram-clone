import { Bookmark, Cog, Grid, SquareUser } from "lucide-react";
import { useState } from "react";
import { Posts } from "./Posts";
import { SavedPosts } from "./SavedPosts";
import { TaggedPosts } from "./TaggedPosts";
import { FollowModal } from "../modals/FollowModal";

export const Profile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-3xl w-full h-full flex flex-col mx-auto px-4 pt-8">
      {children}
    </div>
  );
};

export const Avatar = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div className="w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full bg-gray-800 overflow-hidden">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const SettingsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:text-gray-400 transition cursor-pointer"
    >
      <Cog size={24} />
    </button>
  );
};

export const ActionButton = ({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`w-full bg-gray-800 hover:bg-gray-700 text-white p-1.5 md:p-3 rounded-lg md:rounded-xl text-sm font-semibold transition cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const Stats = ({
  postsCount,
  followersCount,
  followingCount,
  username,
  ownerId,
}: {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  username: string;
  ownerId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>("");

  const handleOpenModal = (title: string) => {
    setTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTitle("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="hidden md:flex gap-10">
        <span className="text-sm">
          <strong>{postsCount}</strong> posts
        </span>
        <span
          onClick={() => handleOpenModal("Followers")}
          className="text-sm cursor-pointer"
        >
          <strong>{followersCount}</strong> followers
        </span>
        <span
          onClick={() => handleOpenModal("Following")}
          className="text-sm cursor-pointer"
        >
          <strong>{followingCount}</strong> following
        </span>
      </div>
      <FollowModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        username={username}
        ownerId={ownerId}
        title={title}
      />
    </>
  );
};

export const DisplayName = ({ name }: { name: string }) => {
  return <h1 className="text-sm font-normal">{name}</h1>;
};

export const Username = ({ name }: { name: string }) => {
  return <h2 className="text-2xl font-bold">{name}</h2>;
};

export const Bio = ({ text }: { text: string }) => {
  return <p className="text-sm">{text}</p>;
};

export const Content = ({ profileId }: { profileId: string }) => {
  const [activeTab, setActiveTab] = useState<"POSTS" | "SAVED" | "TAGGED">(
    "POSTS",
  );

  return (
    <div className="flex-1 flex flex-col pt-12 pb-6">
      <div className="grid grid-cols-3 place-items-center">
        <button
          onClick={() => setActiveTab("POSTS")}
          className={`px-6 py-2 cursor-pointer transition ${
            activeTab === "POSTS"
              ? "text-white border-white border-b-2"
              : "text-gray-400"
          }`}
        >
          <Grid size={24} />
        </button>
        <button
          onClick={() => setActiveTab("SAVED")}
          className={`px-6 py-2 cursor-pointer transition ${
            activeTab === "SAVED"
              ? "text-white border-white border-b-2"
              : "text-gray-400"
          }`}
        >
          <Bookmark size={24} />
        </button>
        <button
          onClick={() => setActiveTab("TAGGED")}
          className={`px-6 py-2 cursor-pointer transition ${
            activeTab === "TAGGED"
              ? "text-white border-white border-b-2"
              : "text-gray-400"
          }`}
        >
          <SquareUser size={24} />
        </button>
      </div>
      {activeTab === "POSTS" && <Posts profileId={profileId} />}
      {activeTab === "SAVED" && <SavedPosts />}
      {activeTab === "TAGGED" && <TaggedPosts />}
    </div>
  );
};

Profile.Avatar = Avatar;
Profile.SettingsButton = SettingsButton;
Profile.ActionButton = ActionButton;
Profile.Stats = Stats;
Profile.DisplayName = DisplayName;
Profile.Username = Username;
Profile.Bio = Bio;
Profile.Content = Content;
