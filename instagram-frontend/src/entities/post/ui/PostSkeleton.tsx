export const PostSkeleton = () => {
  return (
    <div className="w-full max-w-[468px] mx-auto mb-4 md:rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />
        <div className="flex flex-col gap-1">
          <div className="w-36 h-3 bg-neutral-800 rounded animate-pulse" />
          <div className="w-24 h-3 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
      {/* Image Area (4:3 Ratio) */}
      <div className="w-full aspect-4/3 bg-neutral-800 animate-pulse rounded-md" />
    </div>
  );
};
