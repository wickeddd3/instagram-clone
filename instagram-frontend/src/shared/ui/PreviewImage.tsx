export const PreviewImage = ({ previewUrl }: { previewUrl: string }) => {
  return (
    <img
      src={previewUrl}
      alt="Preview"
      loading="lazy"
      decoding="async"
      className="w-full h-full object-contain"
    />
  );
};
