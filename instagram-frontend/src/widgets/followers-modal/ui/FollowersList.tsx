import { useInView } from "react-intersection-observer";
import { useInfiniteFollowers } from "../model/useInfiniteFollowers";
import { Spinner } from "@/shared/ui/Spinner";
import { ProfileLink } from "@/entities/profile";
import { RemoveFollowerButton } from "@/features/profile/remove-follower";
import { useModalActions } from "@/app/providers/ModalContext";

export const FollowersList = ({
  username,
  profileId,
  profileUsername,
  canModify = false,
}: {
  username: string;
  profileId: string;
  profileUsername: string;
  canModify?: boolean;
}) => {
  const { closeModal } = useModalActions();

  const { followers, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteFollowers({
      username,
    });

  const { ref } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
    onChange: (inView) => {
      if (inView && hasMore && !isLoadingMore && !loading) loadMore();
    },
  });

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
          <p>No followers yet</p>
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
