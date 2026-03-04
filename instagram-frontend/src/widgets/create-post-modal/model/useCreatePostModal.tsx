import { useModalActions } from "@/app/providers/ModalContext";
import { CreatePostModal } from "../ui/CreatePostModal";

export const useCreatePostModal = () => {
  const { openModal } = useModalActions();

  const openCreatePostModal = () => {
    openModal({
      content: <CreatePostModal />,
      hasCloseButton: true,
    });
  };

  return {
    openCreatePostModal,
  };
};
