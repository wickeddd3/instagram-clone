import { memo, useCallback, useEffect } from "react";
import { useSearchProfiles } from "../model/useSearchProfiles";
import { useRecentSearches } from "../model/useRecentSearches";
import { ProfileLink } from "@/entities/profile";

export const SearchResults = memo(
  ({ query, onClose }: { query: string; onClose?: () => void }) => {
    const { executeSearch, results, loading } = useSearchProfiles();
    const { addRecentSearch } = useRecentSearches();

    useEffect(() => {
      executeSearch({ variables: { query } });
    }, [query, executeSearch]);

    const handleAddRecentSearch = useCallback(
      (targetId: string) => {
        addRecentSearch({ variables: { targetId } });
        onClose?.();
      },
      [addRecentSearch, onClose],
    );

    if (loading) {
      return (
        <div className="h-full flex justify-center items-center p-4">
          <span className="text-gray-500 text-sm">Searching...</span>
        </div>
      );
    }

    if (!loading && !results.length) {
      return (
        <div className="h-full flex justify-center items-center p-4">
          <span className="text-gray-500 text-sm">No results found.</span>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col gap-1">
        {results.map((profile) => (
          <ProfileLink
            key={profile.id}
            profile={profile}
            onClick={() => handleAddRecentSearch(profile.id)}
          />
        ))}
      </div>
    );
  },
);

SearchResults.displayName = "SearchResults";
