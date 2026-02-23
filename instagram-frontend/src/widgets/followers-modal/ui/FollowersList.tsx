import { useMemo } from "react";
import { useInfiniteFollowers } from "../model/useInfiniteFollowers";
import { Spinner } from "@/shared/ui/Spinner";
import { SearchField } from "@/shared/ui/SearchField";
import { ProfileLink } from "@/entities/profile";
import { RemoveFollowerButton } from "@/features/profile/remove-follower";
import { useModal } from "@/app/providers/ModalContext";

export const FollowersList = ({
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
  const { followers, loading } = useInfiniteFollowers({ username });

  const canModify = useMemo(
    () => !!(authId && profileId && authId === profileId),
    [authId, profileId],
  );

  if (loading)
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-4">
      <SearchField />
      <ul className="flex-1 flex flex-col overflow-y-auto">
        {followers.map((profile) => (
          <li className="w-full" key={profile.id}>
            <ProfileLink
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
          </li>
        ))}
      </ul>
    </div>
  );
};
