import { useQuery } from "@apollo/client/react";
import { SearchField } from "./SearchField";
import { FollowList } from "./FollowList";
import { GET_FOLLOWING } from "../../graphql/queries/profile";
import { Loader2 } from "lucide-react";
import type { FollowingData } from "../../types/profile";

export const FollowingList = ({ username }: { username: string }) => {
  const { data, loading } = useQuery<FollowingData>(GET_FOLLOWING, {
    variables: { username },
    skip: !username,
  });

  if (loading)
    return (
      <div className="flex justify-center pt-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-4">
      <SearchField />
      <FollowList profiles={data?.getFollowing || []} />
    </div>
  );
};
