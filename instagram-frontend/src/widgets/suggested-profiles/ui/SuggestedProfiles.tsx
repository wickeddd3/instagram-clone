import { SuggestionProfileLink } from "@/entities/profile";
import { useSuggestedProfiles } from "../model/useSuggestedProfiles";
import { FollowProfileSuggestionButton } from "@/features/profile/follow-profile";
import { useAuth } from "@/app/providers/AuthContext";
import { useMemo } from "react";

export const SuggestedProfiles = ({ limit }: { limit?: number }) => {
  const { suggestedProfiles, loading } = useSuggestedProfiles({ limit });
  const { authUser } = useAuth();
  const authId = useMemo(() => authUser?.getProfileById?.id, [authUser]);

  if (loading)
    return <div className="animate-pulse w-full h-40 bg-gray-900 rounded-lg" />;

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
