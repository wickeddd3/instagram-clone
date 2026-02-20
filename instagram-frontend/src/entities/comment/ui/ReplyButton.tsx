export const ReplyButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`font-medium hover:text-white cursor-pointer ${className}`}
    >
      Reply
    </button>
  );
};
