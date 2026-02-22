import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileContent,
  ProfileHeader,
  ProfileHeaderSkeleton,
} from "@/entities/profile";
import { useAuth } from "@/app/providers/AuthContext";
import { useSettingsModal } from "@/widgets/settings-modal";
import { useAccountProfile } from "../model/useAccountProfile";
import { FollowProfileButton } from "@/features/profile/follow-profile";
import { useModalTrigger } from "@/hooks/useModalTrigger";
import { ProfilePosts } from "./ProfilePosts";
import { SavedPosts } from "./SavedPosts";

export const AccountProfile = ({ username }: { username: string }) => {
  if (!username) return;

  const { authUser } = useAuth();

  const authId = useMemo(() => authUser?.getProfileById?.id, [authUser]);

  const { profile, loading } = useAccountProfile({ username: username || "" });

  const navigate = useNavigate();
  const { openSettingsModal } = useSettingsModal();
  const { openFollowerModal, openFollowingModal } = useModalTrigger();

  const handleEditProfile = () => {
    navigate("/accounts/edit");
  };

  return (
    <div className="max-w-3xl w-full h-full flex flex-col mx-auto px-4 pt-8">
      {loading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          <ProfileHeader>
            <ProfileHeader.Avatar
              avatarUrl={profile?.avatarUrl || "/ig-default.jpg"}
            />
            <section className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-4">
                <ProfileHeader.Username name={profile?.username || ""} />
                <ProfileHeader.SettingsButton onClick={openSettingsModal} />
              </div>
              <ProfileHeader.DisplayName name={profile?.displayName || ""} />
              <ProfileHeader.Stats
                postsCount={profile?.postsCount || 0}
                followersCount={profile?.followersCount || 0}
                followingCount={profile?.followingCount || 0}
                onClickFollowers={openFollowerModal}
                onClickFollowing={openFollowingModal}
              />
            </section>
          </ProfileHeader>
          <ProfileHeader.Bio text={profile?.bio || ""} />

          {profile?.isMe ? (
            <div className="flex gap-4">
              <ProfileHeader.ActionButton
                label="Edit profile"
                onClick={handleEditProfile}
              />
              <ProfileHeader.ActionButton
                label="View archive"
                onClick={() => {}}
              />
            </div>
          ) : (
            <div className="flex gap-4">
              {authId && profile && (
                <FollowProfileButton authId={authId} targetProfile={profile} />
              )}
              <ProfileHeader.ActionButton label="Message" onClick={() => {}} />
            </div>
          )}
        </div>
      )}

      <ProfileContent
        profilePostsSlot={<ProfilePosts profileId={profile?.id || ""} />}
        savedPostsSlot={<SavedPosts />}
        taggedPostsSlot={<h3 className="text-center py-8">tagged posts</h3>}
      />
    </div>
  );
};
