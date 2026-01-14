import { useQuery } from "@apollo/client/react";
import { GET_RECENT_SEARCHES } from "../../graphql/queries/profile";
import { SearchResultItem } from "./SearchResultItem";
import type { RecentSearchesData } from "../../types/profile";
import { useEffect } from "react";

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
      <div className="text-sm font-bold mt-2 px-2 pb-2">Recent</div>
      {data?.getRecentSearches.map((user) => (
        <SearchResultItem user={user} onClick={onClose} isRecentItem={true} />
      ))}
    </div>
  );
};
