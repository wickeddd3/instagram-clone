import { useModalActions } from "@/shared/lib";
import { PostDetailsNavigationModal } from "../ui/PostDetailsNavigationModal";
import type { Post } from "@/entities/post";
import { useCallback } from "react";

export const usePostNavigationModal = () => {
  const { openModal } = useModalActions();

  const openPostDetailsNavigationModal = useCallback(
    (posts: Post[], index: number) => {
      openModal({
        content: <PostDetailsNavigationModal posts={posts} index={index} />,
        hasCloseButton: true,
      });
    },
    [openModal],
  );

  return {
    openPostDetailsNavigationModal,
  };
};
