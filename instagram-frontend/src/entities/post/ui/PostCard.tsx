import { type ReactNode } from "react";
import type { Post } from "./../model/types";
import { PostHeader } from "./PostHeader";
import { PostDetails } from "./PostDetails";

interface PostCardProps {
  post: Post;
  imageSlot?: ReactNode;
  likeButtonSlot?: ReactNode;
  saveButtonSlot?: ReactNode;
  commentButtonSlot?: ReactNode;
  chatButtonSlot?: ReactNode;
  totalCommentsSlot?: ReactNode;
  commentFieldSlot?: ReactNode;
}

export const PostCard = ({
  post: {
    author: { username, avatarUrl },
    likesCount,
    caption,
    createdAt,
  },
  imageSlot,
  likeButtonSlot,
  saveButtonSlot,
  commentButtonSlot,
  chatButtonSlot,
  totalCommentsSlot,
  commentFieldSlot,
}: PostCardProps) => {
  return (
    <article className="w-full max-w-[470px] mx-auto flex flex-col gap-2">
      <PostHeader className="pl-2">
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

      {imageSlot}

      <div className="flex justify-between items-center text-white pl-2">
        <div className="flex items-center gap-4">
          {likeButtonSlot}
          {commentButtonSlot}
          {chatButtonSlot}
        </div>
        {saveButtonSlot}
      </div>

      <PostDetails className="pl-2">
        <PostDetails.Likes likesCount={likesCount} />
        <PostDetails.Caption username={username} caption={caption || ""} />
        {totalCommentsSlot}
      </PostDetails>

      <div className="pl-2 pr-1">{commentFieldSlot}</div>
    </article>
  );
};
