import { useRef } from "react";
import { FeedCardImage } from "./FeedCardImage";
import {
  ChatButton,
  CommentButton,
  PostCard,
  type Post,
} from "@/entities/post";
import { LikeButton } from "@/features/post/like-post";
import { SaveButton } from "@/features/post/save-post";
import { TotalComments } from "@/features/post/view-post-modal";
import { AddCommentField } from "@/features/comment/add-comment";

export const FeedCard = ({ post }: { post: Post }) => {
  // Ref for focusing the comment input when comment button is clicked
  const commentInputRef = useRef<HTMLInputElement>(null);
  const handleFocusComment = () => {
    commentInputRef.current?.focus();
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
      totalCommentsSlot={<TotalComments post={post} />}
      commentFieldSlot={
        <AddCommentField postId={post.id} inputRef={commentInputRef} />
      }
    />
  );
};
