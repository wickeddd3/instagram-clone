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

  const handleToggleFollow = () => {
    toggleFollow({ variables: { username: targetProfile.username } });
  };

  return (
    <ProfileHeader.ActionButton
      label={targetProfile?.isFollowing ? "Following" : "Follow"}
      onClick={handleToggleFollow}
      className={
        !targetProfile?.isFollowing ? "bg-indigo-800 hover:bg-indigo-700" : ""
      }
    />
  );
};
