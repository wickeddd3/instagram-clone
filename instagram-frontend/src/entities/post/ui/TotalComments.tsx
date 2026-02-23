export const TotalComments = ({
  commentsCount,
  onClick,
}: {
  commentsCount: number;
  onClick: () => void;
}) => {
  return (
    commentsCount > 0 && (
      <div
        onClick={onClick}
        className="text-neutral-400 text-sm cursor-pointer"
      >
        {commentsCount === 1
          ? `View ${commentsCount} comment`
          : `View all ${commentsCount} comments`}
      </div>
    )
  );
};
