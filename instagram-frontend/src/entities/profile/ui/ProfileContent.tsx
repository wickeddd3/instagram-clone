import { Bookmark, Grid, SquareUser } from "lucide-react";
import { useState, type ReactNode } from "react";

export const ProfileContent = ({
  profilePostsSlot,
  savedPostsSlot,
  taggedPostsSlot,
}: {
  profilePostsSlot: ReactNode;
  savedPostsSlot: ReactNode;
  taggedPostsSlot: ReactNode;
}) => {
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
      {activeTab === "POSTS" && profilePostsSlot}
      {activeTab === "SAVED" && savedPostsSlot}
      {activeTab === "TAGGED" && taggedPostsSlot}
    </div>
  );
};
