import { MessageCircle } from "lucide-react";

export const CommentButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick} aria-label="Comment" title="Comment">
      <MessageCircle
        className="cursor-pointer hover:text-gray-400"
        size={24}
        aria-hidden="true"
      />
    </button>
  );
};
