import { memo, useCallback, useRef, useState } from "react";
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

export const PostDetailsModal = memo(({ value }: { value: Post }) => {
  const [post, setPost] = useState<Post>(value);

  const [replyData, setReplyData] = useState<ReplyData | null>(null);

  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleFocusComment = useCallback(() => {
    commentInputRef.current?.focus();
  }, []);

  const handleReplyButtonClick = useCallback((comment: Comment) => {
    const {
      id,
      author: { username },
    } = comment;
    setReplyData({ username, id });
    // Focus after state update
    requestAnimationFrame(() => commentInputRef.current?.focus());
  }, []);

  const handleLikePostCallback = useCallback(() => {
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
  }, []);

  const handleSavePostCallback = useCallback(() => {
    setPost((prev) => ({
      ...prev,
      isSaved: !prev.isSaved,
    }));
  }, []);

  return (
    <ModalContent className="w-[90%] h-[88%] md:h-[90vh] md:max-w-5/6 lg:max-w-5xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr_auto] h-full bg-neutral-900">
        {/* 1. HEADER (Mobile & Desktop) */}
        <header className="col-start-1 col-end-2 md:col-start-2 md:col-end-3 row-start-1 border-b border-neutral-800 bg-neutral-900 z-10">
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
        </header>

        {/* 2. IMAGE SECTION */}
        <section className="col-start-1 col-end-2 row-start-2 md:row-span-5 bg-black flex items-center justify-center border-r border-neutral-800 overflow-hidden">
          <img
            src={post?.imageUrl}
            alt={`Post ${post.id}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </section>

        {/* 3. COMMENTS LIST */}
        <section className="col-start-1 md:col-start-2 row-start-5 md:row-start-2 bg-neutral-900 max-h-[200px] md:max-h-full min-h-[200px] md:min-h-0">
          <CommentList
            postId={post?.id || ""}
            onReplyClick={handleReplyButtonClick}
          />
        </section>

        {/* 4. INTERACTION BUTTONS */}
        <section className="col-start-1 md:col-start-2 row-start-3 md:row-start-3 bg-neutral-900 md:static">
          <div className="flex justify-between items-center px-3 py-2">
            <div className="flex items-center gap-4">
              <LikeButton post={post} callback={handleLikePostCallback} />
              <CommentButton onClick={handleFocusComment} />
              <ChatButton />
            </div>
            <SaveButton post={post} callback={handleSavePostCallback} />
          </div>
        </section>

        {/* 5. POST DETAILS */}
        <section className="col-start-1 md:col-start-2 row-start-4 md:row-start-4 bg-neutral-900 md:static">
          <div className="flex flex-col gap-1 px-4 py-2">
            <p className="font-medium text-sm">
              {post?.likesCount.toLocaleString()} likes
            </p>
            <p className="text-gray-500 text-[10px] uppercase">
              {formatDateToNow(post?.createdAt || "")}
            </p>
          </div>
        </section>

        {/* 6. INPUT (The Footer) */}
        <footer className="col-start-1 md:col-start-2 row-start-6 md:row-start-5 border-t border-neutral-800 bg-neutral-900 sticky bottom-0 md:static">
          <AddCommentField
            ref={commentInputRef}
            postId={post?.id}
            replyData={replyData}
            formClassName="px-3 py-4"
          />
        </footer>
      </div>
    </ModalContent>
  );
});

PostDetailsModal.displayName = "PostDetailsModal";
