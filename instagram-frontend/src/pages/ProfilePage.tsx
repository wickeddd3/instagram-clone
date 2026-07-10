import { useParams } from "react-router-dom";
import { AccountProfile } from "@/widgets/account-profile";
import { useSettingsModal } from "@/widgets/settings-modal";
import { useFollowersModal } from "@/widgets/followers-modal";
import { useFollowingModal } from "@/widgets/following-modal";
import { usePostNavigationModal } from "@/widgets/post-modal";

const ProfilePage = () => {
  const { username } = useParams();
  const { openSettingsModal } = useSettingsModal();
  const { openFollowersModal } = useFollowersModal();
  const { openFollowingModal } = useFollowingModal();
  const { openPostDetailsNavigationModal } = usePostNavigationModal();

  return (
    <AccountProfile
      username={username || ""}
      onOpenSettings={openSettingsModal}
      onOpenFollowers={openFollowersModal}
      onOpenFollowing={openFollowingModal}
      onOpenPost={openPostDetailsNavigationModal}
    />
  );
};

export default ProfilePage;
