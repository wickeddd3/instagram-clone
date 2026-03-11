import { memo, useEffect, useMemo, useState } from "react";
import { Ellipsis } from "lucide-react";
import { ModalCloseButton } from "@/shared/ui/Modal";
import { useStoryTimer } from "../model/useStoryTimer";
import { ProgressBar } from "./ProgressBar";
import { useModalActions } from "@/app/providers/ModalContext";
import { useAuth } from "@/app/providers/AuthContext";
import { Avatar } from "@/shared/ui/Avatar";
import { PreviewImage } from "@/shared/ui/PreviewImage";
import type { UserStory } from "@/entities/story";
import { ViewersList } from "./ViewersList";
import { useViewStory } from "../model/useViewStory";

export const StoryView = memo(
  ({
    userStory,
    onAllStoriesEnd,
    onPrevUser,
  }: {
    userStory: UserStory;
    onAllStoriesEnd: () => void;
    onPrevUser: () => void;
  }) => {
    const { closeModal } = useModalActions();
    const { authUser } = useAuth();

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showViewers, setShowViewers] = useState(false);

    const activeStory = useMemo(
      () => userStory?.stories[currentIndex],
      [userStory, currentIndex],
    );
    const activeStoryId = useMemo(() => activeStory?.id, [activeStory]);
    const isOwner = useMemo(
      () => authUser?.id === userStory.id,
      [authUser, userStory],
    );

    const handleNextSegment = () => {
      if (currentIndex < userStory.stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onAllStoriesEnd(); // Jump to next user
      }
    };

    const handlePrevSegment = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        onPrevUser(); // Jump to previous user
      }
    };

    const { progress } = useStoryTimer(
      5000,
      handleNextSegment,
      activeStoryId,
      isPaused || showViewers, // Pause if viewing the viewers list
    );

    const { viewStory } = useViewStory();

    useEffect(() => {
      // Reset and start a fresh timer for the new story segment
      const timer = setTimeout(() => {
        viewStory({
          variables: {
            storyId: activeStoryId,
          },
        }).catch((err) => console.error("View tracking failed", err));
      }, 1000); // 1-second threshold

      return () => clearTimeout(timer);
    }, [activeStoryId, viewStory]);

    return (
      <div className="h-full w-full flex flex-col justify-center relative gap-2">
        {/* Progress Bar */}
        <ProgressBar
          segments={userStory?.stories || []}
          activeIndex={currentIndex}
          progress={progress}
        />
        {/* Story Header */}
        <header className="flex justify-between items-center px-3">
          <div className="flex gap-2">
            <Avatar imageUrl={userStory?.avatarUrl} />
            <h6 className="text-sm">{userStory?.username}</h6>
          </div>
          <div className="flex gap-2">
            <button className="px-2 cursor-pointer">
              <Ellipsis />
            </button>
            <ModalCloseButton
              onClose={closeModal}
              iconSize={24}
              className="inline-block md:hidden"
            />
          </div>
        </header>
        {/* Story Content */}
        <section
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex-1 relative overflow-hidden flex items-center bg-black cursor-pointer"
        >
          {/* Navigation Overlays (Tappable Areas) */}
          <div className="absolute inset-0 flex z-10">
            <div
              className="w-1/3 h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevSegment();
              }}
            />
            <div
              className="w-2/3 h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleNextSegment();
              }}
            />
          </div>
          {activeStory?.id && (
            <PreviewImage
              key={activeStory?.id}
              previewUrl={activeStory?.mediaUrl}
            />
          )}
          {isOwner && (
            <div className="absolute bottom-4 left-4 z-20">
              <button
                onClick={() => setShowViewers(true)}
                className="flex items-center gap-1 text-white text-xs font-bold bg-black/20 p-2 rounded-lg backdrop-blur-md cursor-pointer"
              >
                <span>{activeStory?.viewsCount || 0} views</span>
              </button>
            </div>
          )}
        </section>
        {/* Viewers List Drawer */}
        {showViewers && (
          <ViewersList
            storyId={activeStory?.id}
            onClose={() => setShowViewers(false)}
          />
        )}
      </div>
    );
  },
);

StoryView.displayName = "StoryView";
