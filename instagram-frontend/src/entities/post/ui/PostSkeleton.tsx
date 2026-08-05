export const PostSkeleton = () => {
  return (
    <div className="w-full max-w-[470px] mx-auto mb-4 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-3 pl-2">
        <div className="w-8 h-8 rounded-full bg-surface-hover animate-pulse" />
        <div className="flex flex-col gap-1">
          <div className="w-36 h-3 bg-surface-hover rounded animate-pulse" />
          <div className="w-24 h-3 bg-surface-hover rounded animate-pulse" />
        </div>
      </div>
      {/* Image Area — square to match the real feed post */}
      <div className="w-full aspect-square bg-surface-hover animate-pulse rounded-lg border border-border" />
    </div>
  );
};
