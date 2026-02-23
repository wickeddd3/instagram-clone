import { useQuery } from "@apollo/client/react";
import type { Followers } from "./types";
import { GET_FOLLOWERS } from "../api/query";

export const useInfiniteFollowers = ({ username }: { username: string }) => {
  const { data, loading } = useQuery<Followers>(GET_FOLLOWERS, {
    variables: { username },
    skip: !username,
  });

  return {
    followers: data?.getFollowers || [],
    loading,
  };
};
