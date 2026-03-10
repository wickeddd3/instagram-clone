import { memo, useCallback, useMemo, useState } from "react";
import { StoryView } from "@/features/story/view-story";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { UserStory } from "@/entities/story";
import { useModalActions } from "@/app/providers/ModalContext";

export const StoryCarousel = memo(
  ({ stories, index }: { stories: UserStory[]; index: number }) => {
    const { closeModal } = useModalActions();

    const [userIndex, setUserIndex] = useState<number>(index);

    const activeUserStory = useMemo(
      () => stories[userIndex],
      [stories, userIndex],
    );
    const hasPrevious = useMemo(() => userIndex > 0, [userIndex]);
    const hasNext = useMemo(
      () => userIndex < stories.length - 1,
      [userIndex, stories],
    );

    const handleNextUser = useCallback(() => {
      if (userIndex < stories.length - 1) {
        setUserIndex((prev) => prev + 1);
      } else {
        closeModal(); // No more users left
      }
    }, [userIndex, stories.length]);

    const handlePrevUser = () => {
      if (userIndex > 0) {
        setUserIndex((prev) => prev - 1);
      }
    };

    return (
      <div className="h-full w-full flex justify-center items-center gap-2">
        <button
          onClick={handlePrevUser}
          className={`bg-gray-100 rounded-full p-1 cursor-pointer ${!hasPrevious && "opacity-0"}`}
        >
          <ChevronLeft size={22} className="text-gray-950" />
        </button>
        <div className="bg-neutral-800 h-full w-full md:w-[500px] rounded-lg">
          <StoryView
            key={activeUserStory?.id} // Resets StoryView state for new user
            userStory={activeUserStory}
            onAllStoriesEnd={handleNextUser}
          />
        </div>
        <button
          onClick={handleNextUser}
          className={`bg-gray-100 rounded-full p-1 cursor-pointer ${!hasNext && "opacity-0"}`}
        >
          <ChevronRight size={22} className="text-gray-950" />
        </button>
      </div>
    );
  },
);

StoryCarousel.displayName = "StoryCarousel";
