import { usePost } from "../../contexts/PostContext";
import { useModalTrigger } from "../../hooks/useModalTrigger";
import type { PostData } from "../../types/post";

export const PostDetails = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
};

export const Likes = ({ likesCount }: { likesCount: number }) => {
  return <div className="font-semibold text-sm">{likesCount} likes</div>;
};

export const Caption = ({
  username,
  caption,
}: {
  username: string;
  caption: string;
}) => {
  return (
    <div className="text-sm">
      <span className="font-semibold mr-2">{username}</span>
      {caption}
    </div>
  );
};

export const Comments = ({
  commentsCount,
  post,
}: {
  commentsCount: number;
  post: PostData;
}) => {
  const { selectPost } = usePost();
  const { openPostModal } = useModalTrigger();

  return (
    commentsCount > 0 && (
      <div
        onClick={() => {
          selectPost(post);
          openPostModal();
        }}
        className="text-neutral-400 text-sm cursor-pointer"
      >
        {commentsCount === 1
          ? `View ${commentsCount} comment`
          : `View all ${commentsCount} comments`}
      </div>
    )
  );
};

PostDetails.Likes = Likes;
PostDetails.Caption = Caption;
PostDetails.Comments = Comments;
