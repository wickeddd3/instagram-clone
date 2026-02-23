import { useQuery } from "@apollo/client/react";
import type { ProfileById } from "@/entities/profile";
import { GET_PROFILE_BY_ID } from "../api/query";

export const useProfileById = ({ userId }: { userId: string }) => {
  const { data, loading } = useQuery<ProfileById>(GET_PROFILE_BY_ID, {
    variables: { id: userId },
    skip: !userId,
  });

  return { profile: data?.getProfileById, loading };
};
