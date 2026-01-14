import { useLazyQuery } from "@apollo/client/react";
import { SEARCH_PROFILES } from "../../graphql/queries/profile";
import type { SearchResultsData } from "../../types/profile";
import { SearchResultItem } from "./SearchResultItem";
import { useEffect } from "react";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

export const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const [executeSearch, { data, loading }] =
    useLazyQuery<SearchResultsData>(SEARCH_PROFILES);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        executeSearch({ variables: { query } });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, executeSearch]);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <span className="text-gray-500 text-sm">Searching...</span>
      </div>
    );
  }

  if (!loading && !data?.searchProfiles.length) {
    return (
      <div className="h-full flex justify-center items-center">
        <span className="text-gray-500 text-sm">No results found.</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-1">
      {data?.searchProfiles.map((user) => (
        <SearchResultItem user={user} onClick={onClose} />
      ))}
    </div>
  );
};
