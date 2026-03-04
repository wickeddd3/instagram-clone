import { useModalActions } from "@/app/providers/ModalContext";
import { FollowersModal } from "../ui/FollowersModal";

export const useFollowersModal = () => {
  const { openModal } = useModalActions();

  const openFollowersModal = ({
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
        <FollowersModal
          username={username}
          authId={authId}
          profileId={profileId}
          profileUsername={profileUsername}
        />
      ),
    });
  };

  return {
    openFollowersModal,
  };
};
