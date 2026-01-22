export const CommentSkeleton = () => {
  return (
    <div className="w-full flex items-center gap-6 py-2">
      <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-3 bg-neutral-800 rounded animate-pulse" />
          <div className="w-36 h-3 bg-neutral-950 rounded animate-pulse" />
        </div>
        <div className="flex gap-8">
          <div className="w-16 h-2 bg-neutral-800 rounded animate-pulse" />
          <div className="w-12 h-2 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
