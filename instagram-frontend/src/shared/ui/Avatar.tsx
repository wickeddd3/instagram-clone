export const Avatar = ({
  imageUrl,
  username,
  alt,
  className,
}: {
  imageUrl?: string;
  username?: string;
  alt?: string;
  className?: string;
}) => {
  return (
    <img
      src={imageUrl || "/ig-default.jpg"}
      alt={alt || (username ? `${username}'s avatar` : "User avatar")}
      loading="lazy"
      decoding="async"
      className={`w-8 h-8 rounded-full object-cover ${className}`}
    />
  );
};
