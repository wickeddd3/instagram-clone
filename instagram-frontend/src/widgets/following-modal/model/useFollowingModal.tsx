import { useModal } from "@/app/providers/ModalContext";
import { FollowingModal } from "../ui/FollowingModal";

export const useFollowingModal = () => {
  const { openModal } = useModal();

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
