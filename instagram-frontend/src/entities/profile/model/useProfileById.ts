import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_BY_ID } from "../api/query";
import type { ProfileById } from "./types";

export const useProfileById = ({ userId }: { userId: string }) => {
  const { data, loading } = useQuery<ProfileById>(GET_PROFILE_BY_ID, {
    variables: { id: userId },
    skip: !userId,
  });

  return { profile: data?.getProfileById, loading };
};
