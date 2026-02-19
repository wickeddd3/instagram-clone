import { PostModal } from "@/components/modals/PostModal";
import { useModal } from "@/app/providers/ModalContext";

export const usePostModal = () => {
  const { openModal } = useModal();

  const openPostModal = () => {
    openModal({ content: <PostModal />, hasCloseButton: true });
  };

  return {
    openPostModal,
  };
};
