import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import type { PostData } from "../../types/post";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostActions } from "./PostActions";
import { PostDetails } from "./PostDetails";
import { AddComment } from "./AddComment";
import { usePostActions } from "../../hooks/usePostActions";

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
  const [showOverlayHeart, setShowOverlayHeart] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const { togglePostLike, togglePostSave } = usePostActions({ post });

  const handleLikeClick = () => {
    togglePostLike({
      variables: { postId: id },
    });
  };

  const handleBookmarkClick = () => {
    togglePostSave({ variables: { postId: id } });
  };

  const handleDoubleTap = () => {
    togglePostLike({ variables: { postId: id } });
    setShowOverlayHeart(true);
    setTimeout(() => setShowOverlayHeart(false), 1000);
  };

  const handleFocusComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <article className="w-full max-w-[470px] mx-auto flex flex-col gap-4">
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

      <div className="relative rounded-sm overflow-hidden border border-gray-800">
        <PostImage imageUrl={imageUrl} onDoubleClick={handleDoubleTap} />
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

      <PostActions>
        <div className="flex items-center gap-4">
          <PostActions.LikeButton isLiked={isLiked} onClick={handleLikeClick} />
          <PostActions.CommentButton onClick={handleFocusComment} />
          <PostActions.ChatButton />
        </div>
        <PostActions.BookmarkButton
          isSaved={isSaved}
          onClick={handleBookmarkClick}
        />
      </PostActions>

      <PostDetails>
        <PostDetails.Likes likesCount={likesCount} />
        <PostDetails.Caption username={username} caption={caption || ""} />
        <PostDetails.Comments commentsCount={commentsCount} post={post} />
      </PostDetails>

      <AddComment postId={id} inputRef={commentInputRef} />
    </article>
  );
};
