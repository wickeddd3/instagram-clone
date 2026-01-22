import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { RecentSearches } from "./RecentSearches";

export const MobileSearch = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full md:hidden bg-transparent"
    >
      <div className="relative group">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={16}
        />
        <input
          onFocus={() => setIsFocused(true)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-neutral-800 border-none rounded-full py-3 pl-10 pr-4 text-sm placeholder:text-sm placeholder:font-light focus:outline-none"
        />
      </div>
      {isFocused && (
        <div className="absolute top-12 -left-17 w-xs bg-gray-900 border-b border-gray-800 z-50 max-h-[70vh] overflow-y-auto rounded-lg shadow-2xl">
          <div className="flex flex-col gap-2 p-2">
            {query ? (
              <SearchResults query={query} />
            ) : (
              <RecentSearches query={query} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
