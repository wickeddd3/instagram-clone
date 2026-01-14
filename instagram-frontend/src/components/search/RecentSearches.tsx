import { useMutation, useQuery } from "@apollo/client/react";
import { GET_RECENT_SEARCHES } from "../../graphql/queries/profile";
import { SearchResultItem } from "./SearchResultItem";
import type { RecentSearchesData } from "../../types/profile";
import { useEffect } from "react";
import { CLEAR_RECENT_SEARCHES } from "../../graphql/mutations/profile";

interface RecentSearchesProps {
  query: string;
  onClose: () => void;
}

export const RecentSearches = ({ query, onClose }: RecentSearchesProps) => {
  const {
    data,
    loading,
    refetch: refetchHistory,
  } = useQuery<RecentSearchesData>(GET_RECENT_SEARCHES);

  const [clearRecentSearches] = useMutation(CLEAR_RECENT_SEARCHES, {
    update(cache) {
      cache.writeQuery({
        query: GET_RECENT_SEARCHES,
        data: {
          getRecentSearches: [],
        },
      });
    },
  });

  useEffect(() => {
    refetchHistory();
  }, [query]);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <span className="text-gray-500 text-sm">Fetching...</span>
      </div>
    );
  }

  if (!loading && !data?.getRecentSearches.length) {
    return (
      <div className="h-full flex justify-center items-center">
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
      {data?.getRecentSearches.map((user) => (
        <SearchResultItem user={user} onClick={onClose} isRecentItem={true} />
      ))}
    </div>
  );
};
