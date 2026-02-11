import { FollowerList } from "../follow/FollowerList";
import { FollowingList } from "../follow/FollowingList";
import { Modal } from "../Modal";

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  ownerId: string;
  title: string;
  canModify: boolean;
}

export const FollowModal = ({
  isOpen,
  onClose,
  username,
  ownerId,
  title,
  canModify,
}: FollowModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <Modal.Content className="w-full max-w-5/6 md:max-w-3/5 lg:max-w-1/3 h-full max-h-2/5 flex flex-col md:flex-row">
        <div className="w-full h-full flex flex-col">
          <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
            <h1 className="text-center flex-1 font-semibold">{title}</h1>
            <Modal.CloseButton onClose={onClose} iconSize={24} />
          </div>
          <div className="flex-1">
            {title === "Followers" ? (
              <FollowerList
                username={username}
                ownerId={ownerId}
                canModify={canModify}
              />
            ) : (
              <FollowingList
                username={username}
                ownerId={ownerId}
                canModify={canModify}
              />
            )}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
