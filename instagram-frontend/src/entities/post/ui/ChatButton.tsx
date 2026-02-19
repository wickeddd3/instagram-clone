import { Send } from "lucide-react";

export const ChatButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick}>
      <Send className="cursor-pointer hover:text-gray-400" size={24} />
    </button>
  );
};
