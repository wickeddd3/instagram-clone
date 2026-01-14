import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { SEARCH_PROFILES } from "../../graphql/queries/profile";
import { Link } from "react-router-dom";
import { X, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { ProfilesData } from "../../types/profile";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchSidebar = ({ isOpen, onClose }: SearchSidebarProps) => {
  const [query, setQuery] = useState("");
  const [executeSearch, { data, loading }] =
    useLazyQuery<ProfilesData>(SEARCH_PROFILES);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        executeSearch({ variables: { query } });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, executeSearch]);

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
          {loading ? (
            <div className="flex justify-center p-4 text-gray-500 text-sm">
              Searching...
            </div>
          ) : data?.searchProfiles ? (
            data?.searchProfiles.map((user: any) => (
              <Link
                key={user.id}
                to={`/${user.username}`}
                onClick={onClose}
                className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg transition"
              >
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{user.username}</span>
                  <span className="text-sm text-gray-400">
                    {user.displayName}
                  </span>
                </div>
              </Link>
            ))
          ) : query ? (
            <div className="text-center mt-10 text-gray-500 text-sm">
              No results found.
            </div>
          ) : (
            <div className="text-sm font-bold mt-2 px-2">Recent</div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
