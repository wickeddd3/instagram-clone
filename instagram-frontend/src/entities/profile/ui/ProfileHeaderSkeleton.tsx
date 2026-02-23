export const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-row items-center gap-8 md:gap-12">
        <div className="w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full bg-neutral-800 animate-pulse shrink-0" />

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-60 h-6 bg-neutral-800 rounded animate-pulse" />
            <div className="w-6 h-6 bg-neutral-800 rounded animate-pulse" />
          </div>
          <div className="w-40 h-4 bg-neutral-800 rounded animate-pulse" />
          <div className="flex gap-10">
            <div className="w-16 h-4 bg-neutral-800 rounded animate-pulse" />
            <div className="w-16 h-4 bg-neutral-800 rounded animate-pulse" />
            <div className="w-16 h-4 bg-neutral-800 rounded animate-pulse" />
          </div>
        </section>
      </header>
      <div className="space-y-2">
        <div className="w-60 h-3 bg-neutral-800 rounded animate-pulse" />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 h-10 bg-neutral-800 rounded-xl animate-pulse" />
        <div className="w-1/2 h-10 bg-neutral-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
};
