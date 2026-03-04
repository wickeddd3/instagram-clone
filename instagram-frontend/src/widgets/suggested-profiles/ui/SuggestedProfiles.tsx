import { SuggestionProfileLink } from "@/entities/profile";
import { useSuggestedProfiles } from "../model/useSuggestedProfiles";
import { FollowProfileSuggestionButton } from "@/features/profile/follow-profile";
import { useAuth } from "@/app/providers/AuthContext";
import { useMemo } from "react";
import { SuggestedProfilesSkeleton } from "./SuggestedProfilesSkeleton";

export const SuggestedProfiles = ({ limit }: { limit?: number }) => {
  const { suggestedProfiles, loading } = useSuggestedProfiles({ limit });
  const { authUser } = useAuth();
  const authId = useMemo(() => authUser?.id, [authUser]);

  if (loading) return <SuggestedProfilesSkeleton count={10} />;

  return (
    <div className="flex flex-col gap-3">
      {suggestedProfiles.map((profile) => (
        <SuggestionProfileLink
          key={profile.id}
          profile={profile}
          optionSlot={
            <FollowProfileSuggestionButton
              authId={authId || ""}
              targetProfile={profile}
            />
          }
        />
      ))}
    </div>
  );
};
