import type { ProfileSuggestion } from "../model/types";
import { useFollowProfile } from "../model/useFollowProfile";

export const FollowProfileSuggestionButton = ({
  authId,
  targetProfile,
}: {
  authId: string;
  targetProfile: ProfileSuggestion;
}) => {
  const { toggleFollow } = useFollowProfile({
    authId: authId || "",
    targetProfile: targetProfile,
  });

  const handleToggleFollow = (username: string) => {
    toggleFollow({ variables: { username } });
  };

  return (
    <button
      onClick={() => handleToggleFollow(targetProfile.username)}
      className="text-xs font-bold text-primary hover:text-primary-hover cursor-pointer"
    >
      {targetProfile?.isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};
