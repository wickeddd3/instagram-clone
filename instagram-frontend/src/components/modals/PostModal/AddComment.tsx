import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "../../../graphql/mutations/comment";
import { GET_COMMENTS } from "../../../graphql/queries/comment";

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
}

export const AddComment = ({
  postId,
  text,
  setText,
  replyData,
  setReplyData,
}: AddCommentProps) => {
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { postId } }],
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addComment({
      variables: {
        postId,
        text: replyData ? `@${replyData.username} ${text}` : text,
        parentId: replyData?.id,
      },
    });

    setText("");
    setReplyData(null);
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-3 border-t border-neutral-800 px-3 py-4"
    >
      <input
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
