import { SuggestionProfileLinkSkeleton } from "@/entities/profile";

export const SuggestionsSidebarSkeleton = ({
  count = 5,
}: {
  count?: number;
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-foreground">
          Suggested for you
        </span>
        <div className="w-10 h-4 bg-surface-hover rounded animate-pulse" />
      </div>

      {/* Suggested Users List */}
      <div className="flex flex-col gap-3">
        {[...Array(count)].map((_, i) => (
          <SuggestionProfileLinkSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
