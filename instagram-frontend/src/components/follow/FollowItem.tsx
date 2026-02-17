import { useMutation } from "@apollo/client/react";
import type { ProfileData } from "../../types/profile";
import {
  REMOVE_FOLLOWER,
  REMOVE_FOLLOWING,
} from "../../graphql/mutations/profile";
import { Link } from "react-router-dom";

interface FollowItemProps {
  profile: ProfileData;
  type: string;
  profileUsername: string;
  profileId: string;
  canModify: boolean;
}

export const FollowItem = ({
  profile,
  type,
  profileUsername,
  profileId,
  canModify,
}: FollowItemProps) => {
  const [removeFollower] = useMutation(REMOVE_FOLLOWER, {
    optimisticResponse: {
      removeFollower: {
        id: profile.id,
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
                  cache.identify({ __typename: "Profile", id: profile.id }),
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

  const [removeFollowing] = useMutation(REMOVE_FOLLOWING, {
    optimisticResponse: {
      removeFollowing: {
        id: profile.id,
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
                  cache.identify({ __typename: "Profile", id: profile.id }),
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

  const handleToggleFollow = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    if (type === "follower") {
      return removeFollower({ variables: { username: profile.username } });
    }
    return removeFollowing({ variables: { username: profile.username } });
  };

  return (
    <li className="w-full">
      <Link
        to={`/${profile.username}`}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full p-0.5">
            <div className="bg-[#0d1015] p-0.5 rounded-full w-full h-full">
              <img
                src={profile.avatarUrl || "/ig-default.jpg"}
                alt={`${profile.username}-avatar`}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{profile.username}</span>
            <h1 className="text-sm font-normal text-neutral-400">
              {profile.displayName}
            </h1>
          </div>
        </div>
        {canModify && (
          <button
            onClick={handleToggleFollow}
            className="bg-neutral-800 px-4 py-1 rounded-lg text-sm cursor-pointer"
          >
            {type === "follower" ? "Remove" : "Following"}
          </button>
        )}
      </Link>
    </li>
  );
};
