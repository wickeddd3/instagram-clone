import { useModalActions } from "@/app/providers/ModalContext";
import { FollowingModal } from "../ui/FollowingModal";

export const useFollowingModal = () => {
  const { openModal } = useModalActions();

  const openFollowingModal = ({
    username,
    authId,
    profileId,
    profileUsername,
  }: {
    username: string;
    authId: string;
    profileId: string;
    profileUsername: string;
  }) => {
    openModal({
      content: (
        <FollowingModal
          username={username}
          authId={authId}
          profileId={profileId}
          profileUsername={profileUsername}
        />
      ),
    });
  };

  return {
    openFollowingModal,
  };
};
