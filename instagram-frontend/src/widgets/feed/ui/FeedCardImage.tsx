import { PostImage, type Post } from "@/entities/post";
import { useLikePost } from "@/features/post/like-post";
import { Heart } from "lucide-react";
import { useState } from "react";

export const FeedCardImage = ({ post }: { post: Post }) => {
  const [showOverlayHeart, setShowOverlayHeart] = useState(false);
  const { togglePostLike } = useLikePost({ post });

  const handleDoubleTap = () => {
    togglePostLike({ variables: { postId: post.id } });
    setShowOverlayHeart(true);
    setTimeout(() => setShowOverlayHeart(false), 1000);
  };

  return (
    <div className="relative rounded-sm overflow-hidden border border-gray-800">
      <PostImage imageUrl={post.imageUrl} onDoubleClick={handleDoubleTap} />
      {showOverlayHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Heart
            size={100}
            fill="white"
            className="text-white animate-overlay-heart"
          />
        </div>
      )}
    </div>
  );
};
