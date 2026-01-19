export const PostImage = ({
  imageUrl,
  onClick,
  onDoubleClick,
}: {
  imageUrl: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}) => {
  return (
    <img
      src={imageUrl}
      alt="Post Image"
      className="w-full h-auto object-cover"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
};
