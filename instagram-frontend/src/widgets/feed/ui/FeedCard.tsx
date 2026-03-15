import { memo, useCallback, useMemo, useRef } from "react";
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
import { useAuth } from "@/app/providers/AuthContext";
import { FollowProfileSuggestionButton } from "@/features/profile/follow-profile";
import { FeedImageCarousel } from "./FeedImageCarousel";

export const FeedCard = memo(({ post }: { post: Post }) => {
  const { authUser } = useAuth();
  const { openPostDetailsModal } = usePostModal();

  const handleOpenPostDetailsModal = useCallback(() => {
    openPostDetailsModal(post);
  }, [post, openPostDetailsModal]);

  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleFocusComment = useCallback(() => {
    commentInputRef.current?.focus();
  }, []);

  const slots = useMemo(
    () => ({
      image: <FeedImageCarousel post={post} />,
      like: <LikeButton post={post} />,
      save: <SaveButton post={post} />,
      totalComments: (
        <TotalComments
          commentsCount={post.commentsCount}
          onClick={handleOpenPostDetailsModal}
        />
      ),
      commentField: <AddCommentField postId={post.id} ref={commentInputRef} />,
      followButton: !post?.isFollowing && (
        <FollowProfileSuggestionButton
          authId={authUser?.id || ""}
          targetProfile={post.author}
        />
      ),
    }),
    [post, authUser, openPostDetailsModal],
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
      optionSlot={slots.followButton}
    />
  );
});

FeedCard.displayName = "FeedCard";
