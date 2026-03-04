import { Heart, MessageCircle } from "lucide-react";
import type { Post } from "../model/types";
import { memo, useState } from "react";

export const PostThumbnail = memo(
  ({ post, onClick }: { post: Post; onClick: () => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <article
        className="relative group w-full bg-neutral-800 overflow-hidden aspect-square cursor-pointer"
        onClick={onClick}
      >
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-neutral-700" />
        )}

        <img
          src={post.imageUrl}
          alt={`Post ${post.id}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center gap-6 text-white font-bold">
          <div className="flex items-center gap-1">
            <Heart className="fill-white" size={20} />
            {post.likesCount}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="fill-white" size={20} />
            {post.commentsCount}
          </div>
        </div>
      </article>
    );
  },
);

PostThumbnail.displayName = "PostThumbnail";
