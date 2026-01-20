import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useState } from "react";

export const PostActions = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex justify-between items-center text-white ${className}`}
    >
      {children}
    </div>
  );
};

export const LikeButton = ({
  isLiked,
  onClick,
}: {
  isLiked: boolean;
  onClick: () => void;
}) => {
  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    setAnimate(true);
    // Reset animation class after 450ms
    setTimeout(() => setAnimate(false), 450);
    onClick();
  };

  return (
    <button onClick={handleLike} className="group relative">
      <Heart
        size={28}
        className={`transition-all duration-200 cursor-pointer ${
          isLiked
            ? "fill-red-500 text-red-500"
            : "text-white group-hover:text-gray-400"
        } ${animate ? "animate-like-heart" : ""}`}
      />
    </button>
  );
};

export const CommentButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick}>
      <MessageCircle className="cursor-pointer hover:text-gray-400" size={24} />
    </button>
  );
};

export const ChatButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick}>
      <Send className="cursor-pointer hover:text-gray-400" size={24} />
    </button>
  );
};

export const BookmarkButton = ({
  isSaved,
  onClick,
}: {
  isSaved: boolean;
  onClick: () => void;
}) => {
  const handleBookmark = () => {
    onClick();
  };

  return (
    <button onClick={handleBookmark} className="group relative">
      <Bookmark
        size={28}
        className={`transition-all duration-200 cursor-pointer ${
          isSaved
            ? "fill-white text-white"
            : "text-white group-hover:text-gray-400"
        }`}
      />
    </button>
  );
};

PostActions.LikeButton = LikeButton;
PostActions.CommentButton = CommentButton;
PostActions.ChatButton = ChatButton;
PostActions.BookmarkButton = BookmarkButton;
