import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "../api/mutation";

export const useAddComment = () => {
  const [addComment] = useMutation(ADD_COMMENT, {
    update(
      cache,
      { data: { addComment: newComment } }: any,
      { variables }: any,
    ) {
      if (!newComment) return;

      const postId = variables?.postId;
      const parentId = variables?.parentId || null;

      const commentRef = cache.identify({
        __typename: "Comment",
        id: newComment.id,
      });

      // Update comment list (If exists)
      cache.modify({
        fields: {
          getComments(existing, { storeFieldName }) {
            const matchesPost = storeFieldName.includes(`"postId":"${postId}"`);

            // Strictly check for parentId in the serialized key
            const matchesParent = parentId
              ? storeFieldName.includes(`"parentId":"${parentId}"`)
              : storeFieldName.includes('"parentId":null');

            if (!matchesPost || !matchesParent) return existing;

            return {
              ...existing,
              comments: [...existing.comments, { __ref: commentRef }],
            };
          },
        },
      });

      // Update Parent Comment count (If has parent comment)
      if (parentId) {
        cache.modify({
          id: cache.identify({ __typename: "Comment", id: parentId }),
          fields: {
            repliesCount: (prev) => prev + 1,
          },
        });
      }

      // Update Post comments count
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
