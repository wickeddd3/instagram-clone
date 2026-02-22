import { Heart } from "lucide-react";
import { useState } from "react";
import { useLikeComment } from "../model/useLikeComment";
import type { Comment } from "@/entities/comment";

export const LikeButton = ({ comment }: { comment: Comment }) => {
  const [animate, setAnimate] = useState(false);
  const { toggleCommentLike } = useLikeComment({ comment });

  const handleLikeClick = () => {
    setAnimate(true);
    // Reset animation class after 450ms
    setTimeout(() => setAnimate(false), 450);
    // Call the mutation to toggle like status
    toggleCommentLike({
      variables: { commentId: comment.id },
    });
  };

  return (
    <button onClick={handleLikeClick} className="group relative">
      <Heart
        size={14}
        className={`transition-all duration-200 cursor-pointer ${
          comment.isLiked
            ? "fill-red-500 text-red-500"
            : "text-white group-hover:text-gray-400"
        } ${animate ? "animate-like-heart" : ""}`}
      />
    </button>
  );
};
