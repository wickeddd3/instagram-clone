import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchFollowers } from "../model/useSearchFollowers";
import { Spinner } from "@/shared/ui/Spinner";
import { ProfileLink } from "@/entities/profile";
import { RemoveFollowerButton } from "@/features/profile/remove-follower";
import { useModal } from "@/app/providers/ModalContext";

export const FollowersSearchResults = ({
  query,
  username,
  profileId,
  profileUsername,
  canModify = false,
}: {
  query: string;
  username: string;
  profileId: string;
  profileUsername: string;
  canModify?: boolean;
}) => {
  const { closeModal } = useModal();

  const { followers, hasMore, loading, loadMore, searchFollowers } =
    useSearchFollowers({
      username,
    });

  const { ref } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
    onChange: (inView) => {
      if (inView && hasMore && !loading) loadMore(query);
    },
  });

  useEffect(() => {
    if (query)
      searchFollowers({
        variables: { username, query, cursor: null, limit: 10 },
      });
  }, [query, username, searchFollowers]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
      {/* Show spinner while the initial followers are loading */}
      {loading && !followers.length && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {/* Show empty placeholder for empty search results */}
      {!loading && followers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-neutral-500">
          <p>No results found for "{query}"</p>
        </div>
      )}

      {/* Render followers once loaded */}
      <div className="flex flex-col gap-1 py-2">
        {followers.map((profile) => (
          <ProfileLink
            key={profile.id}
            profile={profile}
            optionSlot={
              canModify && (
                <RemoveFollowerButton
                  profileId={profileId}
                  profileUsername={profileUsername}
                  targetProfileId={profile.id}
                  targetProfileUsername={profile.username}
                />
              )
            }
            onClick={closeModal}
          />
        ))}
      </div>

      {/* Sentinel for Infinite Scrolling */}
      {hasMore && (
        <div ref={ref} className="w-full flex justify-center items-center py-4">
          <Spinner />
        </div>
      )}
    </div>
  );
};
