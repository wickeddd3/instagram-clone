import { useQuery } from "@apollo/client/react";
import type { ProfilePostsData } from "../../types/post";
import { GET_PROFILE_POSTS } from "../../graphql/queries/post";
import { PostItem } from "./PostItem";
import { ProfilePostsSkeleton } from "../loaders/ProfilePostsSkeleton";

export const Posts = ({ profileId }: { profileId: string }) => {
  const { loading, error, data } = useQuery<ProfilePostsData>(
    GET_PROFILE_POSTS,
    {
      variables: { profileId, limit: 20, offset: 0 },
      skip: !profileId,
    }
  );

  return (
    <>
      {loading && <ProfilePostsSkeleton />}

      {error && (
        <div className="flex w-full justify-center pt-20 text-red-500">
          Error: {error.message}
        </div>
      )}

      <div className="grid grid-cols-3 gap-0.5">
        {data?.getProfilePosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};
