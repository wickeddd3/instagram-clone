export const Avatar = ({
  imageUrl,
  className,
}: {
  imageUrl?: string;
  className?: string;
}) => {
  return (
    <img
      src={imageUrl || "/default-avatar.png"}
      className={`w-8 h-8 rounded-full object-cover ${className}`}
    />
  );
};
