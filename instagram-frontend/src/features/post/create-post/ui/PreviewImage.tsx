export const PreviewImage = ({ previewUrl }: { previewUrl: string }) => {
  return (
    <img
      src={previewUrl}
      alt="Preview"
      className="w-full h-full object-cover"
    />
  );
};
