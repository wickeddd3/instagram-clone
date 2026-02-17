import { useModal } from "../contexts/ModalContext";
import { CreatePostModal } from "../components/modals/CreatePostModal/index";
import { PostModal } from "../components/modals/PostModal";
import { SettingsModal } from "../components/modals/SettingsModal";
import { UploadAvatarModal } from "../components/modals/UploadAvatarModal";
import { FollowerModal } from "../components/modals/FollowerModal";
import { FollowingModal } from "../components/modals/FollowingModal";

export const useModalTrigger = () => {
  const { openModal } = useModal();

  const openCreatePostModal = () => {
    openModal({ content: <CreatePostModal />, hasCloseButton: true });
  };

  const openPostModal = () => {
    openModal({ content: <PostModal />, hasCloseButton: true });
  };

  const openSettingsModal = () => {
    openModal({ content: <SettingsModal /> });
  };

  const openUploadAvatarModal = () => {
    openModal({ content: <UploadAvatarModal /> });
  };

  const openFollowerModal = () => {
    openModal({ content: <FollowerModal /> });
  };

  const openFollowingModal = () => {
    openModal({ content: <FollowingModal /> });
  };

  return {
    openCreatePostModal,
    openPostModal,
    openSettingsModal,
    openUploadAvatarModal,
    openFollowerModal,
    openFollowingModal,
  };
};
