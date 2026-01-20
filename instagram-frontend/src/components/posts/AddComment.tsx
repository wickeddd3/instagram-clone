import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "../../graphql/mutations/comment";

export const AddComment = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");

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
        variables: { postId, text: commentText },
      });
    } catch (err) {
      console.error(err);
      setText(commentText); // Put text back if it fails
    }
  };

  return (
    <form onSubmit={handleSend} className="flex items-center gap-3 py-1">
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
