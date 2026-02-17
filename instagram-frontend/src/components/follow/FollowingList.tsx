import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { SearchField } from "./SearchField";
import { FollowList } from "./FollowList";
import { GET_FOLLOWING, GET_PROFILE } from "../../graphql/queries/profile";
import { Loader2 } from "lucide-react";
import type { FollowingData, ProfileDataByUsername } from "../../types/profile";
import { useAuth } from "../../contexts/AuthContext";

export const FollowingList = () => {
  const { username } = useParams();
  const { authUser } = useAuth();

  const { data, loading } = useQuery<FollowingData>(GET_FOLLOWING, {
    variables: { username },
    skip: !username,
  });

  const { data: userData, loading: userDataLoading } =
    useQuery<ProfileDataByUsername>(GET_PROFILE, {
      variables: { username },
      skip: !username,
    });

  const authId = useMemo(() => authUser?.getProfileById.id, [authUser]);
  const profileId = useMemo(() => userData?.getProfile.id, [userData]);
  const canModify = useMemo(
    () => !!(authId && profileId && authId === profileId),
    [authId, profileId],
  );

  if (loading || userDataLoading)
    return (
      <div className="flex justify-center pt-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-4">
      <SearchField />
      {username && profileId && (
        <FollowList
          profiles={data?.getFollowing || []}
          type="following"
          profileUsername={username}
          profileId={profileId}
          canModify={canModify}
        />
      )}
    </div>
  );
};
