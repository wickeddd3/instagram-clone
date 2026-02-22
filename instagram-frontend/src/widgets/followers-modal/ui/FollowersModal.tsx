import { useModal } from "@/app/providers/ModalContext";
import { ModalCloseButton, ModalContent } from "@/shared/ui/Modal";
import { FollowersList } from "./FollowersList";

export const FollowersModal = ({
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
  const { closeModal } = useModal();

  return (
    <ModalContent className="w-full max-w-5/6 md:max-w-3/5 lg:max-w-1/3 h-full max-h-2/5 flex flex-col md:flex-row">
      <div className="w-full h-full flex flex-col">
        <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
          <h1 className="text-center flex-1 font-semibold">Followers</h1>
          <ModalCloseButton onClose={closeModal} iconSize={24} />
        </div>
        <div className="flex-1">
          <FollowersList
            username={username}
            authId={authId}
            profileId={profileId}
            profileUsername={profileUsername}
          />
        </div>
      </div>
    </ModalContent>
  );
};
