import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "../api/mutation";

export const useAddComment = ({ postId }: { postId: string }) => {
  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }: any) {
      const newComment = addComment;
      if (!newComment) return;

      const commentRef = cache.identify({
        __typename: "Comment",
        id: newComment.id,
      });

      cache.modify({
        fields: {
          getComments(existing, { storeFieldName }) {
            if (!storeFieldName.includes(postId)) return existing;

            return {
              ...existing,
              comments: [...existing.comments, { __ref: commentRef }],
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

  return { addComment };
};
