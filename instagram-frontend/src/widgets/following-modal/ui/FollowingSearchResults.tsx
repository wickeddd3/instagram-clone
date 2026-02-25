import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchFollowing } from "../model/useSearchFollowing";
import { Spinner } from "@/shared/ui/Spinner";
import { ProfileLink } from "@/entities/profile";
import { RemoveFollowingButton } from "@/features/profile/remove-following";
import { useModal } from "@/app/providers/ModalContext";

export const FollowingSearchResults = ({
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

  const { following, hasMore, loading, loadMore, searchFollowing } =
    useSearchFollowing({
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
      searchFollowing({
        variables: { username, query, cursor: null, limit: 10 },
      });
  }, [query, username, searchFollowing]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
      {/* Show spinner while the initial following are loading */}
      {loading && !following.length && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {/* Show empty placeholder for empty search results */}
      {!loading && following.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-neutral-500">
          <p>No results found for "{query}"</p>
        </div>
      )}

      {/* Render following once loaded */}
      <div className="flex flex-col gap-1 py-2">
        {following.map((profile) => (
          <ProfileLink
            key={profile.id}
            profile={profile}
            optionSlot={
              canModify && (
                <RemoveFollowingButton
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
