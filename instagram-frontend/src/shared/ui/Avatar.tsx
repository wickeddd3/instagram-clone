export const Avatar = ({
  imageUrl,
  className,
}: {
  imageUrl?: string;
  className?: string;
}) => {
  return (
    <img
      src={imageUrl || "/ig-default.jpg"}
      alt="Comment Author Avatar"
      loading="lazy"
      decoding="async"
      className={`w-8 h-8 rounded-full object-cover ${className}`}
    />
  );
};
