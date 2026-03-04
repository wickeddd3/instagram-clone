import { Bookmark, Grid, SquareUser } from "lucide-react";
import { memo, useState, type ReactNode } from "react";

export const ProfileContent = memo(
  ({
    profilePostsSlot,
    savedPostsSlot,
    taggedPostsSlot,
    isMyProfile,
  }: {
    profilePostsSlot: ReactNode;
    savedPostsSlot: ReactNode;
    taggedPostsSlot: ReactNode;
    isMyProfile: boolean;
  }) => {
    const [activeTab, setActiveTab] = useState<"POSTS" | "SAVED" | "TAGGED">(
      "POSTS",
    );

    return (
      <div className="flex-1 flex flex-col pt-12 pb-6">
        <div
          className={`grid grid-flow-col place-items-center border-b border-gray-800`}
        >
          <TabButton
            active={activeTab === "POSTS"}
            onClick={() => setActiveTab("POSTS")}
            icon={<Grid size={24} />}
          />

          {isMyProfile && (
            <TabButton
              active={activeTab === "SAVED"}
              onClick={() => setActiveTab("SAVED")}
              icon={<Bookmark size={24} />}
            />
          )}

          <TabButton
            active={activeTab === "TAGGED"}
            onClick={() => setActiveTab("TAGGED")}
            icon={<SquareUser size={24} />}
          />
        </div>
        <div className={activeTab === "POSTS" ? "block" : "hidden"}>
          {profilePostsSlot}
        </div>

        {isMyProfile && (
          <div className={activeTab === "SAVED" ? "block" : "hidden"}>
            {savedPostsSlot}
          </div>
        )}

        <div className={activeTab === "TAGGED" ? "block" : "hidden"}>
          {taggedPostsSlot}
        </div>
      </div>
    );
  },
);

const TabButton = ({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 cursor-pointer transition-all duration-200 ${
      active
        ? "text-white border-white border-b-2"
        : "text-gray-400 hover:text-gray-200"
    }`}
  >
    {icon}
  </button>
);

ProfileContent.displayName = "ProfileContent";
