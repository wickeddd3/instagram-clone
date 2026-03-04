import { SuggestionProfileLinkSkeleton } from "@/entities/profile";

export const SuggestedProfilesSkeleton = ({
  count = 5,
}: {
  count?: number;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(count)].map((_, i) => (
        <SuggestionProfileLinkSkeleton key={i} />
      ))}
    </div>
  );
};
