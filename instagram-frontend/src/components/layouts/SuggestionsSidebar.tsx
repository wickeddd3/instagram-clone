import { useQuery, useMutation } from "@apollo/client/react";
import { GET_SUGGESTED_PROFILES } from "../../graphql/queries/profile";
import { TOGGLE_FOLLOW } from "../../graphql/mutations/profile";
import { Link } from "react-router-dom";
import type { SuggestedProfilesData } from "../../types/profile";

export const SuggestionsSidebar = () => {
  const { data, loading } = useQuery<SuggestedProfilesData>(
    GET_SUGGESTED_PROFILES,
    {
      variables: { limit: 5 },
    }
  );
  const [toggleFollow] = useMutation(TOGGLE_FOLLOW);

  const handleToggleFollow = (username: string) => {
    toggleFollow({ variables: { username } });
  };

  if (loading)
    return <div className="animate-pulse w-full h-40 bg-gray-900 rounded-lg" />;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-gray-100">
          Suggested for you
        </span>
        <Link
          to="/explore/people"
          className="text-xs font-bold text-gray-100 hover:text-gray-400"
        >
          See All
        </Link>
      </div>

      {/* Suggested Users List */}
      <div className="flex flex-col gap-3">
        {data?.getSuggestedProfiles.map((user: any) => (
          <div key={user.id} className="flex items-center justify-between">
            <Link to={`/${user.username}`} className="flex items-center gap-3">
              <img
                src={user.avatarUrl || "/default.png"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-white">
                  {user.username}
                </span>
                <span className="text-[12px] text-gray-500">
                  {user.followersCount > 0
                    ? `Followed by ${user.mutualFriend}`
                    : "New to Instagram"}
                </span>
              </div>
            </Link>
            <button
              onClick={() => handleToggleFollow(user.username)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
