import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { SettingsModal } from "../components/modals/SettingsModal";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "../components/profile/Profile";
import type { ProfileDataByUsername } from "../types/profile";
import { GET_PROFILE } from "../graphql/queries/profile";

const ProfilePage = () => {
  const { username } = useParams();

  const { data, loading } = useQuery<ProfileDataByUsername>(GET_PROFILE, {
    variables: { username },
    skip: !username,
  });

  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleEditProfile = () => {
    navigate("/accounts/edit");
  };

  if (loading)
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
            avatarUrl={data?.getProfile.avatarUrl || "/ig-default.jpg"}
          />
          <section className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <Profile.Username name={data?.getProfile.username || ""} />
              <Profile.SettingsButton onClick={() => setIsSettingsOpen(true)} />
            </div>
            <Profile.DisplayName name={data?.getProfile.displayName || ""} />
            <Profile.Stats
              postsCount={data?.getProfile.postsCount || 0}
              followersCount={data?.getProfile.followersCount || 0}
              followingCount={data?.getProfile.followingCount || 0}
            />
          </section>
        </header>

        <Profile.Bio text={data?.getProfile.bio || ""} />

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

      <Profile.Content profileId={data?.getProfile.id || ""} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </Profile>
  );
};

export default ProfilePage;
