export const CommentLikes = ({ likesCount }: { likesCount: number }) => {
  return (
    <span className="font-medium">
      {likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`}
    </span>
  );
};
