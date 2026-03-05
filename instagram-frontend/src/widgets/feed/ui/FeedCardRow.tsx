import { type RowComponentProps } from "react-window";
import { type Post } from "@/entities/post";
import { FeedCard } from "./FeedCard";
import { useMemo } from "react";
import { Spinner } from "@/shared/ui/Spinner";

export function FeedCardRow({
  index,
  style,
  ariaAttributes,
  posts,
  hasMore,
}: RowComponentProps<{
  posts: Post[];
  hasMore: boolean;
}>) {
  const isLoaderRow = useMemo(
    () => hasMore && index === posts.length,
    [posts.length],
  );
  const post = useMemo(() => posts[index], [index]);

  return (
    <div style={style} className="pb-8" {...ariaAttributes}>
      {isLoaderRow ? (
        <div className="w-full flex justify-center items-center py-4">
          <Spinner />
        </div>
      ) : post ? (
        <FeedCard post={post} />
      ) : null}
    </div>
  );
}
