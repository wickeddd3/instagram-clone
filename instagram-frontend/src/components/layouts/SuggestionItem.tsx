import { Link } from "react-router-dom";
import type { ProfileData } from "../../types/profile";
import { useMutation } from "@apollo/client/react";
import { TOGGLE_FOLLOW } from "../../graphql/mutations/profile";

interface SuggestionItemProps {
  user: ProfileData;
}

export const SuggestionItem = ({ user }: SuggestionItemProps) => {
  const [toggleFollow] = useMutation(TOGGLE_FOLLOW);

  const handleToggleFollow = (username: string) => {
    toggleFollow({ variables: { username } });
  };

  return (
    <div key={user.id} className="flex items-center justify-between">
      <Link to={`/${user.username}`} className="flex items-center gap-3">
        <img
          src={user.avatarUrl || "/default.png"}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-white">{user.username}</span>
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
  );
};
