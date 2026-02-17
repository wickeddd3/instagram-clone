import { Heart, MessageCircle } from "lucide-react";
import { usePost } from "../../contexts/PostContext";
import type { PostData } from "../../types/post";
import { useModalTrigger } from "../../hooks/useModalTrigger";

interface PostItemProps {
  post: PostData;
}

export const PostItem = ({ post }: PostItemProps) => {
  const { selectPost } = usePost();
  const { openPostModal } = useModalTrigger();

  return (
    <article
      className="relative group cursor-pointer"
      onClick={() => {
        selectPost(post);
        openPostModal();
      }}
    >
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
