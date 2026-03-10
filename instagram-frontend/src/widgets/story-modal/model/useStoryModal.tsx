import { useModalActions } from "@/app/providers/ModalContext";
import { StoryModal } from "../ui/StoryModal";
import { useCallback } from "react";
import type { UserStory } from "@/entities/story";

export const useStoryModal = () => {
  const { openModal } = useModalActions();

  const openStoryModal = useCallback(
    (stories: UserStory[], index: number) => {
      openModal({
        content: <StoryModal stories={stories} index={index} />,
        hasCloseButton: true,
      });
    },
    [openModal],
  );

  return {
    openStoryModal,
  };
};
