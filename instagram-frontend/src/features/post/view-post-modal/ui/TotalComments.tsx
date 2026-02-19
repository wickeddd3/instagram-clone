import { usePost } from "@/app/providers/PostContext";
import type { Post } from "@/entities/post";
import { usePostModal } from "../model/usePostModal";

export const TotalComments = ({ post }: { post: Post }) => {
  const { selectPost } = usePost();
  const { openPostModal } = usePostModal();

  return (
    post.commentsCount > 0 && (
      <div
        onClick={() => {
          selectPost(post);
          openPostModal();
        }}
        className="text-neutral-400 text-sm cursor-pointer"
      >
        {post.commentsCount === 1
          ? `View ${post.commentsCount} comment`
          : `View all ${post.commentsCount} comments`}
      </div>
    )
  );
};
