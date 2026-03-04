import { lazy, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileContent,
  ProfileHeader,
  ProfileHeaderSkeleton,
} from "@/entities/profile";
import { useAuth } from "@/app/providers/AuthContext";
import { useAccountProfile } from "../model/useAccountProfile";
import { FollowProfileButton } from "@/features/profile/follow-profile";
import { useSettingsModal } from "@/widgets/settings-modal";
import { useFollowersModal } from "@/widgets/followers-modal";
import { useFollowingModal } from "@/widgets/following-modal";

const LazyProfilePosts = lazy(() =>
  import("./ProfilePosts").then((m) => ({ default: m.ProfilePosts })),
);
const LazySavedPosts = lazy(() =>
  import("./SavedPosts").then((m) => ({ default: m.SavedPosts })),
);
const LazyTaggedPosts = lazy(() =>
  import("./TaggedPosts").then((m) => ({ default: m.TaggedPosts })),
);

export const AccountProfile = ({ username }: { username: string }) => {
  if (!username) return;

  const { authUser } = useAuth();
  const authId = useMemo(() => authUser?.id, [authUser]);
  const { profile, loading } = useAccountProfile({ username: username || "" });
  const isMyProfile = useMemo(() => !!profile?.isMe, [profile?.isMe]);

  const navigate = useNavigate();
  const { openSettingsModal } = useSettingsModal();
  const { openFollowersModal } = useFollowersModal();
  const { openFollowingModal } = useFollowingModal();

  const profilePosts = useMemo(
    () => <LazyProfilePosts profileId={profile?.id || ""} />,
    [profile],
  );
  const savedPosts = useMemo(
    () => <LazySavedPosts profileId={profile?.id || ""} />,
    [profile],
  );

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
                {profile?.isMe && (
                  <ProfileHeader.SettingsButton onClick={openSettingsModal} />
                )}
              </div>
              <ProfileHeader.DisplayName name={profile?.displayName || ""} />
              <ProfileHeader.Stats
                postsCount={profile?.postsCount || 0}
                followersCount={profile?.followersCount || 0}
                followingCount={profile?.followingCount || 0}
                onClickFollowers={() =>
                  openFollowersModal({
                    username: profile?.username || "",
                    authId: authId || "",
                    profileId: profile?.id || "",
                    profileUsername: profile?.username || "",
                  })
                }
                onClickFollowing={() =>
                  openFollowingModal({
                    username: profile?.username || "",
                    authId: authId || "",
                    profileId: profile?.id || "",
                    profileUsername: profile?.username || "",
                  })
                }
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
        profilePostsSlot={profilePosts}
        savedPostsSlot={savedPosts}
        taggedPostsSlot={<LazyTaggedPosts />}
        isMyProfile={isMyProfile}
      />
    </div>
  );
};
