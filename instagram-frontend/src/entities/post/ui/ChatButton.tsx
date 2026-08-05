import { Send } from "lucide-react";

export const ChatButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick} aria-label="Share" title="Share">
      <Send
        className="cursor-pointer hover:text-muted"
        size={24}
        aria-hidden="true"
      />
    </button>
  );
};
