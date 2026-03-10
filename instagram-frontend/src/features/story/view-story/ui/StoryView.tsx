import { ModalCloseButton } from "@/shared/ui/Modal";
import { useStoryTimer } from "../model/useStoryTimer";
import { ProgressBar } from "./ProgressBar";
import { useModalActions } from "@/app/providers/ModalContext";
import { Avatar } from "@/shared/ui/Avatar";
import { PreviewImage } from "@/shared/ui/PreviewImage";
import { Ellipsis } from "lucide-react";
import type { UserStory } from "@/entities/story";
import { memo, useMemo, useState } from "react";

export const StoryView = memo(
  ({
    userStory,
    onAllStoriesEnd,
  }: {
    userStory: UserStory;
    onAllStoriesEnd: () => void;
  }) => {
    const { closeModal } = useModalActions();

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const activeStory = useMemo(
      () => userStory?.stories[currentIndex],
      [userStory?.stories, currentIndex],
    );

    const handleNextSegment = () => {
      if (currentIndex < userStory.stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onAllStoriesEnd(); // Jump to next user
      }
    };

    const { progress } = useStoryTimer(
      5000,
      handleNextSegment,
      activeStory?.id,
    );

    return (
      <div className="h-full w-full flex flex-col gap-2">
        <ProgressBar
          segments={userStory?.stories || []}
          activeIndex={currentIndex}
          progress={progress}
        />
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
        {activeStory?.id && (
          <PreviewImage
            key={activeStory?.id}
            previewUrl={activeStory?.mediaUrl}
          />
        )}
      </div>
    );
  },
);

StoryView.displayName = "StoryView";
