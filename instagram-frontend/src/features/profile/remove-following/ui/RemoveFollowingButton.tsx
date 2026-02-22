import { useRemoveFollowing } from "../model/useRemoveFollowing";

export const RemoveFollowingButton = ({
  profileId,
  profileUsername,
  targetProfileId,
  targetProfileUsername,
}: {
  profileId: string;
  profileUsername: string;
  targetProfileId: string;
  targetProfileUsername: string;
}) => {
  const { removeFollowing } = useRemoveFollowing({
    profileId: profileId,
    profileUsername: profileUsername,
    targetProfileId: targetProfileId,
  });

  const handleRemoveFollowing = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    return removeFollowing({ variables: { username: targetProfileUsername } });
  };

  return (
    <button
      onClick={handleRemoveFollowing}
      className="bg-neutral-800 px-4 py-1 rounded-lg text-sm cursor-pointer"
    >
      Following
    </button>
  );
};
