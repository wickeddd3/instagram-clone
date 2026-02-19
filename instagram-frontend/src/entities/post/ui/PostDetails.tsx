export const PostDetails = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
};

export const Likes = ({ likesCount }: { likesCount: number }) => {
  return <div className="font-semibold text-sm">{likesCount} likes</div>;
};

export const Caption = ({
  username,
  caption,
}: {
  username: string;
  caption: string;
}) => {
  return (
    <div className="text-sm">
      <span className="font-semibold mr-2">{username}</span>
      {caption}
    </div>
  );
};

PostDetails.Likes = Likes;
PostDetails.Caption = Caption;
