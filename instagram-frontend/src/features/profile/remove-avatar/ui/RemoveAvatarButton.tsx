import { useRemoveAvatar } from "../model/useRemoveAvatar";

export const RemoveAvatarButton = ({
  avatarUrl,
  text = "Remove Current Photo",
  className,
  onClick = () => {},
}: {
  avatarUrl: string;
  text?: string;
  className?: string;
  onClick?: () => void;
}) => {
  const { handleRemoveAvatar } = useRemoveAvatar({
    onCompleted: onClick,
  });

  return (
    <button
      disabled={!avatarUrl}
      onClick={() => handleRemoveAvatar(avatarUrl)}
      className={`py-3.5 text-sm text-red-500 font-bold border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};
