import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "../components/modals/SettingsModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Profile } from "../components/profile/Profile";

const ProfilePage = () => {
  const { authUser, authUserLoading } = useAuth();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (authUserLoading)
    return (
      <div className="flex justify-center pt-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <Profile>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <header className="flex flex-row items-center gap-8 md:gap-12">
          <Profile.Avatar
            avatarUrl={authUser?.getProfile.avatarUrl || "/ig-default.jpg"}
          />
          <section className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <Profile.Username name={authUser?.getProfile.username || ""} />
              <Profile.SettingsButton onClick={() => setIsSettingsOpen(true)} />
            </div>
            <Profile.DisplayName
              name={authUser?.getProfile.displayName || ""}
            />
            <Profile.Stats
              postsCount={authUser?.getProfile.postsCount || 0}
              followersCount={authUser?.getProfile.followersCount || 0}
              followingCount={authUser?.getProfile.followingCount || 0}
            />
          </section>
        </header>

        <Profile.Bio text={authUser?.getProfile.bio || ""} />

        <div className="flex gap-4">
          <Profile.ActionButton
            label="Edit profile"
            onClick={handleEditProfile}
          />
          <Profile.ActionButton label="View archive" onClick={() => {}} />
        </div>

        {/* --- STORY HIGHLIGHTS (Optional placeholder) --- */}
        <div className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide">
          {/* Repeat Story circles here if needed */}
        </div>
      </div>

      <Profile.Content profileId={authUser?.getProfile.id || ""} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </Profile>
  );
};

export default ProfilePage;
