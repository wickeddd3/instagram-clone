export const CaptionTextarea = ({
  value,
  onChange,
  disabled,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <textarea
      className={`bg-transparent text-foreground w-full h-full p-4 resize-none focus:outline-none placeholder-muted ${className}`}
      placeholder="Write a caption..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};
