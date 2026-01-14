import { useState } from "react";
import { X, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { RecentSearches } from "../search/RecentSearches";
import { SearchResults } from "../search/SearchResults";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchSidebar = ({ isOpen, onClose }: SearchSidebarProps) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 460 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen fixed top-0 z-60 bg-[#0d1015] border-r border-gray-800"
    >
      <div className="p-6 flex flex-col h-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
        >
          <X size={24} />
        </button>

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
            <SearchResults query={query} onClose={onClose} />
          ) : (
            <RecentSearches query={query} onClose={onClose} />
          )}
        </div>
      </div>
    </motion.aside>
  );
};
