import { memo, useCallback, useMemo, useRef } from "react";
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
import { usePostModal } from "@/widgets/post-modal";

export const FeedCard = memo(({ post }: { post: Post }) => {
  const { openPostDetailsModal } = usePostModal();

  const handleOpenPostDetailsModal = useCallback(() => {
    openPostDetailsModal(post);
  }, [post, openPostDetailsModal]);

  // Ref for focusing the comment input when comment button is clicked
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleFocusComment = useCallback(() => {
    commentInputRef.current?.focus();
  }, []);

  const slots = useMemo(
    () => ({
      image: <FeedCardImage post={post} />,
      like: <LikeButton post={post} />,
      save: <SaveButton post={post} />,
      totalComments: (
        <TotalComments
          commentsCount={post.commentsCount}
          onClick={handleOpenPostDetailsModal}
        />
      ),
      commentField: (
        <AddCommentField postId={post.id} inputRef={commentInputRef} />
      ),
    }),
    [post, openPostDetailsModal],
  ); // Only recreate if post object changes

  return (
    <PostCard
      key={post.id}
      post={post}
      imageSlot={slots.image}
      likeButtonSlot={slots.like}
      saveButtonSlot={slots.save}
      commentButtonSlot={<CommentButton onClick={handleFocusComment} />}
      chatButtonSlot={<ChatButton />}
      totalCommentsSlot={slots.totalComments}
      commentFieldSlot={slots.commentField}
    />
  );
});

FeedCard.displayName = "FeedCard";
