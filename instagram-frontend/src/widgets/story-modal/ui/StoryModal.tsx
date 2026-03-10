import { memo } from "react";
import { ModalCloseButton, ModalContent } from "@/shared/ui/Modal";
import { useModalActions } from "@/app/providers/ModalContext";
import type { UserStory } from "@/entities/story";
import { StoryCarousel } from "@/features/story/view-story";

export const StoryModal = memo(
  ({ stories, index }: { stories: UserStory[]; index: number }) => {
    const { closeModal } = useModalActions();

    return (
      <ModalContent className="w-full h-full overflow-hidden">
        <div className="h-full w-full flex justify-between items-start p-4">
          <h1
            className="text-3xl font-medium hidden md:inline-block"
            style={{ fontFamily: "Grand Hotel, cursive" }}
          >
            Instagram
          </h1>
          <div className="h-full w-full">
            <StoryCarousel stories={stories} index={index} />
          </div>
          <ModalCloseButton
            onClose={closeModal}
            iconSize={24}
            className="hidden md:inline-block"
          />
        </div>
      </ModalContent>
    );
  },
);

StoryModal.displayName = "StoryModal";
