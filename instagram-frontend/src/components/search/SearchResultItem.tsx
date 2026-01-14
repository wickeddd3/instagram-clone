import { Link } from "react-router-dom";
import type { ProfileData } from "../../types/profile";
import {
  ADD_RECENT_SEARCH,
  REMOVE_RECENT_SEARCH,
} from "../../graphql/mutations/profile";
import { useMutation } from "@apollo/client/react";
import { X } from "lucide-react";

interface SearchResultItemProps {
  user: ProfileData;
  onClick: () => void;
}

export const SearchResultItem = ({ user, onClick }: SearchResultItemProps) => {
  const [addRecentSearch] = useMutation(ADD_RECENT_SEARCH);
  const [removeRecentSearch] = useMutation(REMOVE_RECENT_SEARCH);

  const handleProfileClick = (targetId: string) => {
    addRecentSearch({ variables: { targetId } });
    onClick();
  };

  const handleRemoveRecentSearch = (
    event: React.MouseEvent,
    targetId: string
  ) => {
    event.preventDefault(); // Stop Link navigation
    event.stopPropagation(); // Stop event from reaching the Link
    removeRecentSearch({ variables: { targetId } });
  };

  return (
    <Link
      key={user.id}
      to={`/${user.username}`}
      onClick={() => handleProfileClick(user.id)}
      className="flex items-center justify-between gap-2 p-2 hover:bg-gray-800 rounded-lg transition"
    >
      <div className="flex items-center gap-3">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">{user.username}</span>
          <span className="text-sm text-gray-400">{user.displayName}</span>
        </div>
      </div>
      <button
        onClick={(event) => handleRemoveRecentSearch(event, user.id)}
        className="cursor-pointer"
      >
        <X size={24} className="text-gray-400" />
      </button>
    </Link>
  );
};
