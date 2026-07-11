import { SquareUserRound } from "lucide-react";
import { PostsEmpty } from "./PostsEmpty";

export const TaggedPosts = () => {
  return (
    <PostsEmpty
      icon={<SquareUserRound size={44} strokeWidth={1} aria-hidden="true" />}
      title="Photos of you"
      subtitle="When people tag you in photos, they'll appear here."
    />
  );
};
