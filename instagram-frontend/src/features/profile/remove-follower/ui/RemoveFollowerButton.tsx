import { useRemoveFollower } from "../model/useRemoveFollower";

export const RemoveFollowerButton = ({
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
  const { removeFollower } = useRemoveFollower({
    profileId: profileId,
    profileUsername: profileUsername,
    targetProfileId: targetProfileId,
  });

  const handleRemoveFollower = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    removeFollower({ variables: { username: targetProfileUsername } });
  };

  return (
    <button
      onClick={handleRemoveFollower}
      className="bg-neutral-800 px-4 py-1 rounded-lg text-sm cursor-pointer"
    >
      Remove
    </button>
  );
};
