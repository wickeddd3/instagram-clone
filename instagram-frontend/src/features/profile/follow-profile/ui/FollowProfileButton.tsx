import { ProfileHeader, type Profile } from "@/entities/profile";
import { useFollowProfile } from "../model/useFollowProfile";

export const FollowProfileButton = ({
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
    <ProfileHeader.ActionButton
      label={targetProfile?.isFollowing ? "Following" : "Follow"}
      onClick={() => handleToggleFollow(targetProfile.username)}
      variant={targetProfile?.isFollowing ? "secondary" : "primary"}
    />
  );
};
