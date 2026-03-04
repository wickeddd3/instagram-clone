import { useModalActions } from "@/app/providers/ModalContext";
import { PostDetailsModal } from "../ui/PostDetailsModal";
import type { Post } from "@/entities/post";
import { useCallback } from "react";

export const usePostModal = () => {
  const { openModal } = useModalActions();

  const openPostDetailsModal = useCallback(
    (post: Post) => {
      openModal({
        content: <PostDetailsModal value={post} />,
        hasCloseButton: true,
      });
    },
    [openModal],
  );

  return {
    openPostDetailsModal,
  };
};
