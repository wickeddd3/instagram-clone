import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "../components/profile/Profile";
import type { ProfileDataByUsername } from "../types/profile";
import { GET_PROFILE } from "../graphql/queries/profile";
import { TOGGLE_FOLLOW } from "../graphql/mutations/profile";
import { ProfileHeaderSkeleton } from "../components/loaders/ProfileHeaderSkeleton";
import { useAuth } from "../app/providers/AuthContext";
import { useSettingsModal } from "@/widgets/settings-modal";

const ProfilePage = () => {
  const { username } = useParams();
  const { authUser } = useAuth();

  const { data, loading } = useQuery<ProfileDataByUsername>(GET_PROFILE, {
    variables: { username },
    skip: !username,
  });

  const targetId = data?.getProfile.id;
  const authId = authUser?.getProfileById.id;

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
    optimisticResponse: {
      toggleFollow: {
        __typename: "Profile",
        id: data?.getProfile.id,
        isFollowing: !data?.getProfile.isFollowing,
        followersCount: data?.getProfile.isFollowing
          ? (data?.getProfile.followersCount || 0) - 1
          : (data?.getProfile.followersCount || 0) + 1,
      },
    },

    update(cache, { data: { toggleFollow } }: any) {
      // The Target User (profile you are looking at)
      cache.modify({
        id: cache.identify({ __typename: "Profile", id: targetId }),
        fields: {
          isFollowing: () => toggleFollow.isFollowing,
          followersCount: () => toggleFollow.followersCount,
        },
      });

      // Authenticated User (You)
      if (authId && authId !== targetId) {
        cache.modify({
          id: cache.identify({ __typename: "Profile", id: authId }),
          fields: {
            followingCount: (prev) => {
              // If we just followed, increment. If we unfollowed, decrement.
              return toggleFollow.isFollowing ? prev + 1 : prev - 1;
            },
          },
        });
      }
    },
  });

  const navigate = useNavigate();
  const { openSettingsModal } = useSettingsModal();

  const handleEditProfile = () => {
    navigate("/accounts/edit");
  };

  const handleToggleFollow = () => {
    toggleFollow({ variables: { username } });
  };

  return (
    <Profile>
      {loading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <header className="flex flex-row items-center gap-8 md:gap-12">
            <Profile.Avatar
              avatarUrl={data?.getProfile.avatarUrl || "/ig-default.jpg"}
            />
            <section className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-4">
                <Profile.Username name={data?.getProfile.username || ""} />
                <Profile.SettingsButton onClick={openSettingsModal} />
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

          {data?.getProfile.isMe ? (
            <div className="flex gap-4">
              <Profile.ActionButton
                label="Edit profile"
                onClick={handleEditProfile}
              />
              <Profile.ActionButton label="View archive" onClick={() => {}} />
            </div>
          ) : (
            <div className="flex gap-4">
              <Profile.ActionButton
                label={data?.getProfile.isFollowing ? "Following" : "Follow"}
                onClick={handleToggleFollow}
                className={
                  !data?.getProfile.isFollowing
                    ? "bg-indigo-800 hover:bg-indigo-700"
                    : ""
                }
              />
              <Profile.ActionButton label="Message" onClick={() => {}} />
            </div>
          )}
        </div>
      )}

      <Profile.Content profileId={data?.getProfile.id || ""} />
    </Profile>
  );
};

export default ProfilePage;
