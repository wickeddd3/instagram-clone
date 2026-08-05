import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const SuggestionsSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-foreground">
          Suggested for you
        </span>
        <Link
          to="/explore/people"
          className="text-xs font-bold text-foreground hover:text-muted"
        >
          See All
        </Link>
      </div>

      {/* Suggested Users List */}
      {children}
    </div>
  );
};
