import { useMutation } from "@apollo/client/react";
import { REMOVE_FOLLOWING } from "../api/mutation";

export const useRemoveFollowing = ({
  profileId,
  profileUsername,
  targetProfileId,
}: {
  profileId: string;
  profileUsername: string;
  targetProfileId: string;
}) => {
  const [removeFollowing] = useMutation(REMOVE_FOLLOWING, {
    optimisticResponse: {
      removeFollowing: {
        id: profileId,
        __typename: "Profile",
      },
    },
    update(cache) {
      // Remove from the "Following" list cache
      cache.modify({
        fields: {
          getFollowing(existingData, { storeFieldName }) {
            if (!storeFieldName.includes(profileUsername)) return existingData;

            return [
              ...existingData.filter(
                (u: any) =>
                  u.__ref !==
                  cache.identify({
                    __typename: "Profile",
                    id: targetProfileId,
                  }),
              ),
            ];
          },
        },
      });

      // Decrement followingCount on the profile being viewed
      cache.modify({
        id: cache.identify({ __typename: "Profile", id: profileId }),
        fields: {
          followingCount: (prev) => prev - 1,
        },
      });
    },
  });

  return { removeFollowing };
};
