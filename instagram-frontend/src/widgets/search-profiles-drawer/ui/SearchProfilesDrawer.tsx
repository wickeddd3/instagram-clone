import { useMemo, useState } from "react";
import { SearchField } from "./SearchField";
import { useDrawerActions } from "@/app/providers/DrawerContext";
import {
  RecentSearches,
  SearchResults,
} from "@/features/profile/search-profile";
import { useDebounce } from "@/shared/lib/useDebounce";

export const SearchProfilesDrawer = () => {
  const { closeDrawer } = useDrawerActions();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const content = useMemo(() => {
    const trimmedQuery = debouncedQuery.trim();
    if (!trimmedQuery) {
      return <RecentSearches onClose={closeDrawer} />;
    }
    return <SearchResults query={trimmedQuery} onClose={closeDrawer} />;
  }, [debouncedQuery, closeDrawer]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Search</h2>
      <SearchField value={query} onChange={setQuery} />
      <div className="flex-1 overflow-y-auto">{content}</div>
    </div>
  );
};
