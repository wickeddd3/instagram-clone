export const UploadAvatar = ({
  onClick,
}: {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="py-3.5 text-sm text-primary font-bold border-b border-border active:bg-foreground/5 transition-colors cursor-pointer text-center">
      Upload Photo
      <input
        type="file"
        className="hidden"
        onChange={onClick}
        accept="image/*"
      />
    </label>
  );
};
