export const PreviewImage = ({
  previewUrl,
  className = "",
}: {
  previewUrl: string;
  className?: string;
}) => {
  return (
    <img
      src={previewUrl}
      alt="Preview"
      className={`w-full h-full object-contain transition-opacity duration-300 ${className}`}
      loading="lazy"
      decoding="async"
      onLoad={(e) => (e.currentTarget.style.opacity = "1")} // Use a subtle fade-in when loaded
      style={{ opacity: 0 }}
    />
  );
};
