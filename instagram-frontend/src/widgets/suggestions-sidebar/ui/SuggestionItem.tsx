import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import type { Profile } from "@/entities/profile";
import { TOGGLE_FOLLOW } from "../api/mutation";

export const SuggestionItem = ({ profile }: { profile: Profile }) => {
  const [toggleFollow] = useMutation(TOGGLE_FOLLOW);

  const handleToggleFollow = (username: string) => {
    toggleFollow({ variables: { username } });
  };

  return (
    <div key={profile.id} className="flex items-center justify-between">
      <Link to={`/${profile.username}`} className="flex items-center gap-3">
        <img
          src={profile.avatarUrl || "/ig-default.jpg"}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-white">
            {profile.username}
          </span>
          <span className="text-[12px] text-gray-500">
            {profile.followersCount > 0
              ? `Followed by ${profile.mutualFriend}`
              : "New to Instagram"}
          </span>
        </div>
      </Link>
      <button
        onClick={() => handleToggleFollow(profile.username)}
        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
      >
        Follow
      </button>
    </div>
  );
};
