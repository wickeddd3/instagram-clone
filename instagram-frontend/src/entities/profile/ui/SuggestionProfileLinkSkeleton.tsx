export const SuggestionProfileLinkSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse shrink-0" />
        <div className="flex flex-col gap-1 leading-tight">
          <div className="w-35 h-4 bg-neutral-800 rounded animate-pulse" />
          <div className="w-20 h-3 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
      <div className="w-10 h-4 bg-neutral-800 rounded animate-pulse" />
    </div>
  );
};
