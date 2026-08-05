import { MessageCircle } from "lucide-react";

export const CommentButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick} aria-label="Comment" title="Comment">
      <MessageCircle
        className="cursor-pointer hover:text-muted"
        size={24}
        aria-hidden="true"
      />
    </button>
  );
};
