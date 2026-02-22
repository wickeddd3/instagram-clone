import { Heart, MessageCircle } from "lucide-react";
import type { Post } from "../model/types";

export const PostThumbnail = ({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) => {
  return (
    <article className="relative group cursor-pointer" onClick={onClick}>
      <img
        src={post.imageUrl}
        alt={`Post ${post.id}`}
        className="w-full h-full object-cover"
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
};
