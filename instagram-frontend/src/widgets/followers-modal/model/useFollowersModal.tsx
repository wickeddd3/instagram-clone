import { useModal } from "@/app/providers/ModalContext";
import { FollowersModal } from "../ui/FollowersModal";

export const useFollowersModal = () => {
  const { openModal } = useModal();

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
