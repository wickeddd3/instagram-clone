import { Bookmark, Grid, SquareUser } from "lucide-react";
import { memo, Suspense, useState, type ReactNode } from "react";
import { ProfilePostsSkeleton } from "./ProfilePostsSkeleton";

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
          className={`grid grid-flow-col place-items-center border-b border-border`}
        >
          <TabButton
            active={activeTab === "POSTS"}
            onClick={() => setActiveTab("POSTS")}
            label="Posts"
            icon={<Grid size={24} aria-hidden="true" />}
          />

          {isMyProfile && (
            <TabButton
              active={activeTab === "SAVED"}
              onClick={() => setActiveTab("SAVED")}
              label="Saved"
              icon={<Bookmark size={24} aria-hidden="true" />}
            />
          )}

          <TabButton
            active={activeTab === "TAGGED"}
            onClick={() => setActiveTab("TAGGED")}
            label="Tagged"
            icon={<SquareUser size={24} aria-hidden="true" />}
          />
        </div>
        <div className={activeTab === "POSTS" ? "block" : "hidden"}>
          <Suspense fallback={<ProfilePostsSkeleton />}>
            {profilePostsSlot}
          </Suspense>
        </div>

        {isMyProfile && (
          <div className={activeTab === "SAVED" ? "block" : "hidden"}>
            <Suspense fallback={<ProfilePostsSkeleton />}>
              {savedPostsSlot}
            </Suspense>
          </div>
        )}

        <div className={activeTab === "TAGGED" ? "block" : "hidden"}>
          <Suspense fallback={<ProfilePostsSkeleton />}>
            {taggedPostsSlot}
          </Suspense>
        </div>
      </div>
    );
  },
);

const TabButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    title={label}
    aria-pressed={active}
    className={`px-6 py-2 cursor-pointer transition-all duration-200 ${
      active
        ? "text-foreground border-foreground border-b-2"
        : "text-muted hover:text-muted"
    }`}
  >
    {icon}
  </button>
);

ProfileContent.displayName = "ProfileContent";
