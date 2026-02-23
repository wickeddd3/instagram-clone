import { useModal } from "@/app/providers/ModalContext";
import { PostDetailsModal } from "../ui/PostDetailsModal";
import type { Post } from "@/entities/post";

export const usePostModal = () => {
  const { openModal } = useModal();

  const openPostDetailsModal = (post: Post) => {
    openModal({
      content: <PostDetailsModal value={post} />,
      hasCloseButton: true,
    });
  };

  return {
    openPostDetailsModal,
  };
};
