import { useMutation } from "@apollo/client/react";
import { TOGGLE_FOLLOW } from "../api/mutations";
import type { Profile } from "@/entities/profile";

export const useFollowProfile = ({
  authId,
  targetProfile,
}: {
  authId: string;
  targetProfile: Profile;
}) => {
  const { id, isFollowing, followersCount } = targetProfile;

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
    optimisticResponse: {
      toggleFollow: {
        __typename: "Profile",
        id: id,
        isFollowing: !isFollowing,
        followersCount: isFollowing
          ? (followersCount || 0) - 1
          : (followersCount || 0) + 1,
      },
    },

    update(cache, { data: { toggleFollow } }: any) {
      // The Target User (profile you are looking at)
      cache.modify({
        id: cache.identify({ __typename: "Profile", id: id }),
        fields: {
          isFollowing: () => toggleFollow.isFollowing,
          followersCount: () => toggleFollow.followersCount,
        },
      });

      // Authenticated User (You)
      if (authId && authId !== id) {
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

  return { toggleFollow };
};
