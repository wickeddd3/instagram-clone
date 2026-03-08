import { useModalActions } from "@/app/providers/ModalContext";
import { CreateStoryModal } from "../ui/CreateStoryModal";

export const useCreateStoryModal = () => {
  const { openModal } = useModalActions();

  const openCreateStoryModal = () => {
    openModal({
      content: <CreateStoryModal />,
      hasCloseButton: true,
    });
  };

  return {
    openCreateStoryModal,
  };
};
