import { useState } from "react";
import { SearchField } from "./SearchField";
import { useDrawer } from "@/app/providers/DrawerContext";
import {
  RecentSearches,
  SearchResults,
} from "@/features/profile/search-profile";

export const SearchProfilesDrawer = () => {
  const { closeDrawer } = useDrawer();
  const [query, setQuery] = useState("");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Search</h2>
      <SearchField value={query} onChange={setQuery} />
      <div className="flex-1 overflow-y-auto">
        {query ? (
          <SearchResults query={query} onClose={closeDrawer} />
        ) : (
          <RecentSearches query={query} onClose={closeDrawer} />
        )}
      </div>
    </div>
  );
};
