import { memo } from "react";

export const PostImage = memo(
  ({
    imageUrl,
    onClick,
    onDoubleClick,
  }: {
    imageUrl: string;
    onClick?: () => void;
    onDoubleClick?: () => void;
  }) => {
    return (
      <img
        src={imageUrl}
        alt={imageUrl}
        className="w-full h-auto min-h-[200px] object-cover cursor-pointer transition-opacity duration-300"
        loading="lazy"
        decoding="async" // Offloads image decoding from the main thread
        onLoad={(e) => (e.currentTarget.style.opacity = "1")} // Use a subtle fade-in when loaded
        style={{ opacity: 0 }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />
    );
  },
);

PostImage.displayName = "PostImage";
