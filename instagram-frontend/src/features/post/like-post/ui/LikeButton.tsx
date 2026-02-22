import type { Post } from "@/entities/post";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useLikePost } from "../model/useLikePost";

export const LikeButton = ({
  post,
  callback,
}: {
  post: Post;
  callback?: () => void;
}) => {
  const [animate, setAnimate] = useState(false);
  const { togglePostLike } = useLikePost({ post });

  const handleLikeClick = () => {
    setAnimate(true);
    // Reset animation class after 450ms
    setTimeout(() => setAnimate(false), 450);
    // Call the mutation to toggle like status
    togglePostLike({
      variables: { postId: post.id },
    });
    callback?.();
  };

  return (
    <button onClick={handleLikeClick} className="group relative">
      <Heart
        size={28}
        className={`transition-all duration-200 cursor-pointer ${
          post.isLiked
            ? "fill-red-500 text-red-500"
            : "text-white group-hover:text-gray-400"
        } ${animate ? "animate-like-heart" : ""}`}
      />
    </button>
  );
};
