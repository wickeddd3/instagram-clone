import { useQuery } from "@apollo/client/react";
import type { Following } from "./types";
import { GET_FOLLOWING } from "../api/query";

export const useInfiniteFollowing = ({ username }: { username: string }) => {
  const { data, loading } = useQuery<Following>(GET_FOLLOWING, {
    variables: { username },
    skip: !username,
  });

  return {
    following: data?.getFollowing || [],
    loading,
  };
};
