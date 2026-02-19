import { useRef } from "react";
import { FeedCardImage } from "./FeedCardImage";
import {
  ChatButton,
  CommentButton,
  PostCard,
  TotalComments,
  type Post,
} from "@/entities/post";
import { LikeButton } from "@/features/post/like-post";
import { SaveButton } from "@/features/post/save-post";
import { AddCommentField } from "@/features/comment/add-comment";
import { usePost } from "@/app/providers/PostContext";
import { usePostModal } from "@/widgets/post-modal";

export const FeedCard = ({ post }: { post: Post }) => {
  const { selectPost } = usePost();
  const { openPostDetailsModal } = usePostModal();

  // Ref for focusing the comment input when comment button is clicked
  const commentInputRef = useRef<HTMLInputElement>(null);
  const handleFocusComment = () => {
    commentInputRef.current?.focus();
  };

  const handleOpenPostDetailsModal = (post: Post) => {
    selectPost(post);
    openPostDetailsModal();
  };

  return (
    <PostCard
      key={post.id}
      post={post}
      imageSlot={<FeedCardImage post={post} />}
      likeButtonSlot={<LikeButton post={post} />}
      saveButtonSlot={<SaveButton post={post} />}
      commentButtonSlot={<CommentButton onClick={handleFocusComment} />}
      chatButtonSlot={<ChatButton />}
      totalCommentsSlot={
        <TotalComments
          commentsCount={post.commentsCount}
          onClick={() => handleOpenPostDetailsModal(post)}
        />
      }
      commentFieldSlot={
        <AddCommentField postId={post.id} inputRef={commentInputRef} />
      }
    />
  );
};
