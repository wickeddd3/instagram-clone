import { SearchField } from "@/shared/ui/SearchField";
import { useMemo, useState } from "react";
import { FollowersSearchResults } from "./FollowersSearchResults";
import { FollowersList } from "./FollowersList";
import { useDebounce } from "@/shared/lib/useDebounce";

export const Followers = ({
  username,
  authId,
  profileId,
  profileUsername,
}: {
  username: string;
  authId: string;
  profileId: string;
  profileUsername: string;
}) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const canModify = useMemo(
    () => !!(authId && profileId && authId === profileId),
    [authId, profileId],
  );

  return (
    <div className="h-full flex flex-col min-h-0 overflow-hidden">
      <div className="py-2 px-4">
        <SearchField value={query} onChange={setQuery} />
      </div>
      {debouncedQuery ? (
        <FollowersSearchResults
          query={debouncedQuery}
          username={username}
          profileId={profileId}
          profileUsername={profileUsername}
          canModify={canModify}
        />
      ) : (
        <FollowersList
          username={username}
          profileId={profileId}
          profileUsername={profileUsername}
          canModify={canModify}
        />
      )}
    </div>
  );
};
