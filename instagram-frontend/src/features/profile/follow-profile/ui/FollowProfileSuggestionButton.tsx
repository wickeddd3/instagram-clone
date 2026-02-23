import { type Profile } from "@/entities/profile";
import { useFollowProfile } from "../model/useFollowProfile";

export const FollowProfileSuggestionButton = ({
  authId,
  targetProfile,
}: {
  authId: string;
  targetProfile: Profile;
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
      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
    >
      {targetProfile?.isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};
