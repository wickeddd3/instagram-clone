import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "../../../graphql/mutations/comment";

export type ReplyDataType = {
  username: string;
  id: string;
};

interface AddCommentProps {
  postId: string;
  text: string;
  setText: (value: string) => void;
  replyData: ReplyDataType | null;
  setReplyData: (value: ReplyDataType | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const AddComment = ({
  postId,
  text,
  setText,
  replyData,
  setReplyData,
  inputRef,
}: AddCommentProps) => {
  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }: any) {
      const newComment = addComment;
      if (!newComment) return;

      // Write the new comment into that specific bucket
      cache.modify({
        fields: {
          getComments(existingCommentData, { storeFieldName }) {
            if (!storeFieldName.includes(postId)) return existingCommentData;

            return {
              ...existingCommentData,
              comments: [...existingCommentData.comments, newComment],
            };
          },
        },
      });

      // Update the total count on the Post object
      cache.modify({
        id: cache.identify({ __typename: "Post", id: postId }),
        fields: {
          commentsCount: (prev) => prev + 1,
        },
      });
    },
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const commentText = text;
    setText(""); // Clear input immediately for better UX

    try {
      await addComment({
        variables: {
          postId,
          text,
          parentId: replyData?.id,
        },
      });
    } catch (error) {
      console.error(error);
      setText(commentText); // Put text back if it fails
    }

    setReplyData(null);
  };

  return (
    <form onSubmit={handleSend} className="flex items-center gap-3  px-3 py-4">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 bg-transparent border-none text-sm focus:ring-0 outline-none"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="text-white font-bold text-sm disabled:opacity-80"
      >
        Post
      </button>
    </form>
  );
};
