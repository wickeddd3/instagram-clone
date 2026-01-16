export const ProfilePostsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-neutral-800 animate-pulse rounded-sm"
        />
      ))}
    </div>
  );
};
