import type { PostData } from "../../types/post";
import { AddComment } from "./AddComment";
import { usePost } from "../../contexts/PostContext";
import { PostActions } from "./PostActions";
import { PostHeader } from "./PostHeader";

interface PostProps {
  post: PostData;
}

export const Post = ({
  post,
  post: {
    id,
    author: { username, avatarUrl },
    imageUrl,
    likesCount,
    commentsCount,
    caption,
    createdAt,
    isLiked,
    isSaved,
  },
}: PostProps) => {
  const { openPostModal } = usePost();

  return (
    <article className="w-full max-w-[470px] mx-auto flex flex-col gap-4">
      {/* Post Header */}
      <PostHeader>
        <div className="flex items-center gap-3">
          <PostHeader.AuthorAvatar
            avatarUrl={avatarUrl}
            username={username}
            className="bg-linear-to-tr from-yellow-400 to-purple-600"
          />
          <PostHeader.AuthorUsername username={username} />
          <PostHeader.CreatedAt createdAt={createdAt} />
        </div>
        <PostHeader.Options />
      </PostHeader>

      {/* Post Image */}
      <div className="rounded-sm overflow-hidden border border-gray-800">
        <img
          src={imageUrl}
          alt="Post content"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Post Actions */}
      <PostActions postId={id} isLiked={isLiked} isSaved={isSaved} />

      {/* Likes & Caption */}
      <div className="space-y-1">
        <div className="font-semibold text-sm">
          {likesCount.toLocaleString()} likes
        </div>
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </div>
        {commentsCount > 0 && (
          <div
            onClick={() => openPostModal(post)}
            className="text-neutral-400 text-sm cursor-pointer"
          >
            {commentsCount === 1
              ? `View ${commentsCount} comment`
              : `View all ${commentsCount} comments`}
          </div>
        )}
      </div>

      <AddComment postId={id} />
    </article>
  );
};
