import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteFollowing } from "../model/useInfiniteFollowing";
import { Spinner } from "@/shared/ui/Spinner";
import { SearchField } from "@/shared/ui/SearchField";
import { ProfileLink } from "@/entities/profile";
import { RemoveFollowingButton } from "@/features/profile/remove-following";
import { useModal } from "@/app/providers/ModalContext";

export const FollowingList = ({
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
  const { closeModal } = useModal();

  const { following, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteFollowing({ username });

  const { ref } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
    onChange: (inView) => {
      if (inView && hasMore && !isLoadingMore && !loading) loadMore();
    },
  });

  const canModify = useMemo(
    () => !!(authId && profileId && authId === profileId),
    [authId, profileId],
  );

  return (
    <div className="h-full flex flex-col min-h-0 overflow-hidden">
      <div className="py-2 px-4">
        <SearchField />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
        {/* Show spinner while the initial following are loading */}
        {loading && !following.length && (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        )}

        {/* Render followers once loaded */}
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
          <div
            ref={ref}
            className="w-full flex justify-center items-center py-4"
          >
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
