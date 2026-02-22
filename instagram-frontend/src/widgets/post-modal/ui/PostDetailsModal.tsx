import { useRef, useState } from "react";
import {
  ChatButton,
  CommentButton,
  PostHeader,
  type Post,
} from "@/entities/post";
import type { Comment } from "@/entities/comment";
import { ModalContent } from "@/shared/ui/Modal";
import { formatDateToNow } from "@/shared/utils/date";
import { LikeButton } from "@/features/post/like-post";
import { SaveButton } from "@/features/post/save-post";
import { AddCommentField } from "@/features/comment/add-comment";
import { CommentList } from "./CommentList";
import type { ReplyData } from "../model/types";

export const PostDetailsModal = ({ value }: { value: Post }) => {
  const [post, setPost] = useState<Post>(value);

  const [replyData, setReplyData] = useState<ReplyData | null>(null);

  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleFocusComment = () => {
    commentInputRef.current?.focus();
  };

  const handleReplyButtonClick = (comment: Comment) => {
    const {
      id,
      author: { username },
    } = comment;
    setReplyData({ username, id });
  };

  const handleLikePostCallback = () => {
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
    });
  };

  const handleSavePostCallback = () => {
    setPost({
      ...post,
      isSaved: !post.isSaved,
    });
  };

  return (
    <ModalContent className="w-4/5 h-4/5 md:h-[90vh] md:max-w-5/6 lg:max-w-4/5 flex flex-col md:flex-row">
      {/* MOBILE HEADER: Shown only on small screens */}
      <div className="md:hidden border-b border-neutral-800">
        <PostHeader className="p-3">
          <div className="flex items-center gap-3">
            <PostHeader.AuthorAvatar
              avatarUrl={post?.author.avatarUrl}
              username={post?.author.username}
              className="w-10 h-10"
            />
            <PostHeader.AuthorUsername username={post?.author.username} />
          </div>
          <PostHeader.Options />
        </PostHeader>
      </div>

      {/* IMAGE SECTION */}
      <div className="w-full max-h-1/2 md:max-h-full md:w-[60%] bg-black flex items-center justify-center relative md:border-r border-neutral-800">
        <img
          src={post?.imageUrl}
          alt="Preview"
          className="w-full h-full md:h-auto object-contain"
        />
      </div>

      {/* CONTENT SECTION (Header, Comments, Actions) */}
      <div className="w-full md:w-[40%] flex flex-col bg-neutral-900">
        {/* DESKTOP HEADER: Hidden on small screens */}
        <PostHeader className="hidden md:flex p-3 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <PostHeader.AuthorAvatar
              avatarUrl={post?.author.avatarUrl}
              username={post?.author.username}
              className="w-10 h-10"
            />
            <PostHeader.AuthorUsername username={post?.author.username} />
          </div>
          <PostHeader.Options />
        </PostHeader>

        {/* ACTIONS SECTION (On mobile, this comes right after the image) */}
        <div className="flex flex-col order-first md:order-last">
          <div className="flex justify-between items-center text-white px-3 pt-2">
            <div className="flex items-center gap-4">
              {post && (
                <LikeButton post={post} callback={handleLikePostCallback} />
              )}
              <CommentButton onClick={handleFocusComment} />
              <ChatButton />
            </div>
            {post && (
              <SaveButton post={post} callback={handleSavePostCallback} />
            )}
          </div>

          {/* Likes & Date */}
          <div className="flex flex-col px-4 md:py-2">
            <span className="font-medium text-sm py-2 md:py-0">
              {post?.likesCount.toLocaleString()} likes
            </span>
            <span className="text-gray-500 text-xs">
              {formatDateToNow(post?.createdAt || "")}
            </span>
          </div>

          {/* Desktop Add Comment stays here */}
          <div className="hidden md:block border-t border-neutral-800">
            <AddCommentField
              postId={post?.id}
              inputRef={commentInputRef}
              replyData={replyData}
              formClassName="px-3 py-4"
            />
          </div>
        </div>

        {/* COMMENTS SECTION */}
        {/* On mobile, this grows to fill space; on desktop, it occupies the middle */}
        <div className="flex-1 overflow-y-auto max-h-[165px] md:max-h-full overscroll-contain no-scrollbar">
          <CommentList
            postId={post?.id || ""}
            onReplyClick={handleReplyButtonClick}
          />
        </div>

        {/* MOBILE FIXED BOTTOM INPUT */}
        <div className="md:hidden sticky bottom-0 border-t border-neutral-800 bg-neutral-900">
          <AddCommentField
            postId={post?.id}
            inputRef={commentInputRef}
            replyData={replyData}
            formClassName="px-3 py-4"
          />
        </div>
      </div>
    </ModalContent>
  );
};
