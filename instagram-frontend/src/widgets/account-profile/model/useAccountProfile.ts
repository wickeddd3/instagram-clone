import { useQuery } from "@apollo/client/react";
import { GET_PROFILE } from "../api/query";
import type { ProfileByUsername } from "./types";

export const useAccountProfile = ({ username }: { username: string }) => {
  const { data, loading } = useQuery<ProfileByUsername>(GET_PROFILE, {
    variables: { username },
    skip: !username,
  });

  return {
    profile: data?.getProfile,
    loading,
  };
};
