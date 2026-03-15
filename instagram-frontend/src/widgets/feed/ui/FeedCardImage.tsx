import { PostImage, type Post } from "@/entities/post";
import { useLikePost } from "@/features/post/like-post";
import { Heart } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";

export const FeedCardImage = memo(
  ({ post, imageUrl }: { post: Post; imageUrl: string }) => {
    const [showOverlayHeart, setShowOverlayHeart] = useState(false);
    const { togglePostLike } = useLikePost({ post });
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleDoubleTap = useCallback(() => {
      togglePostLike({ variables: { postId: post.id } });

      setShowOverlayHeart(true);

      // Clear existing timer if user taps rapidly
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setShowOverlayHeart(false);
      }, 1000);
    }, [post.id, togglePostLike]);

    return (
      <div className="w-full h-full flex items-center justify-center relative rounded-sm overflow-hidden border border-gray-800 bg-black min-h-[300px]">
        <PostImage imageUrl={imageUrl} onDoubleClick={handleDoubleTap} />
        {showOverlayHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <Heart
              size={100}
              fill={`${post.isLiked ? "red" : "white"}`}
              className={`animate-overlay-heart ${post.isLiked ? "text-red-500" : "text-white"}`}
            />
          </div>
        )}
      </div>
    );
  },
);

FeedCardImage.displayName = "FeedCardImage";
