export const CommentMessage = ({
  username,
  text,
}: {
  username: string;
  text: string;
}) => {
  return (
    <div className="flex flex-wrap">
      <span className="font-semibold mr-2">{username}</span>
      <span className="text-white/90">{text}</span>
    </div>
  );
};
