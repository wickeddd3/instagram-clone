import { useModalActions } from "@/shared/lib";
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
