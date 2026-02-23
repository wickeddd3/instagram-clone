import { useMutation } from "@apollo/client/react";
import { REMOVE_FOLLOWER } from "../api/mutation";

export const useRemoveFollower = ({
  profileId,
  profileUsername,
  targetProfileId,
}: {
  profileId: string;
  profileUsername: string;
  targetProfileId: string;
}) => {
  const [removeFollower] = useMutation(REMOVE_FOLLOWER, {
    optimisticResponse: {
      removeFollower: {
        id: profileId,
        __typename: "Profile",
      },
    },
    update(cache) {
      // Remove from the "Followers" list cache
      cache.modify({
        fields: {
          getFollowers(existingData, { storeFieldName }) {
            // Only modify the list belonging to the profile we are viewing
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

      // Decrement followersCount on the profile being viewed
      cache.modify({
        id: cache.identify({ __typename: "Profile", id: profileId }),
        fields: {
          followersCount: (prev) => prev - 1,
        },
      });
    },
  });

  return { removeFollower };
};
