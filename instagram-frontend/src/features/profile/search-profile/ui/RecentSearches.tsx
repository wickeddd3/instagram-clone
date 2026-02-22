import { useEffect } from "react";
import { X } from "lucide-react";
import { useRecentSearches } from "../model/useRecentSearches";
import { ProfileLink } from "@/entities/profile";

export const RecentSearches = ({
  query,
  onClose,
}: {
  query: string;
  onClose?: () => void;
}) => {
  const {
    recentSearches,
    loading,
    refetchHistory,
    clearRecentSearches,
    removeRecentSearch,
  } = useRecentSearches();

  useEffect(() => {
    refetchHistory();
  }, [query]);

  const handleRemoveRecentSearch = (
    event: React.MouseEvent,
    targetId: string,
  ) => {
    event.preventDefault(); // Stop Link navigation
    event.stopPropagation(); // Stop event from reaching the Link
    removeRecentSearch({ variables: { targetId } });
  };

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center p-4">
        <span className="text-gray-500 text-sm">Fetching...</span>
      </div>
    );
  }

  if (!loading && !recentSearches.length) {
    return (
      <div className="h-full flex justify-center items-center p-4">
        <span className="text-gray-500 text-sm">No recent searches.</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-1">
      <div className="flex justify-between items-center p-2">
        <span className="text-sm font-bold">Recent</span>
        <button
          onClick={() => clearRecentSearches()}
          className="text-sm text-indigo-400 cursor-pointer hover:underline"
        >
          Clear All
        </button>
      </div>
      {recentSearches.map((profile) => (
        <ProfileLink
          key={profile.id}
          profile={profile}
          onClick={onClose}
          optionSlot={
            <button
              onClick={(event) => handleRemoveRecentSearch(event, profile.id)}
              className="cursor-pointer"
            >
              <X size={24} className="text-gray-400" />
            </button>
          }
        />
      ))}
    </div>
  );
};
