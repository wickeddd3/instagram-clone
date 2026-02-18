import { useState } from "react";
import { XCircle } from "lucide-react";
import { RecentSearches } from "../search/RecentSearches";
import { SearchResults } from "../search/SearchResults";
import { useDrawer } from "../../contexts/DrawerContext";

export const SearchDrawer = () => {
  const { closeDrawer } = useDrawer();
  const [query, setQuery] = useState("");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Search</h2>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 cursor-pointer"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>

      {/* Results List */}
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
