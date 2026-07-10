import { Suspense } from "react";
import { Feed } from "@/widgets/feed";
import { AuthAppbar, Footer } from "@/widgets/navigation";
import {
  LazySuggestionsSidebar,
  SuggestionsSidebarSkeleton,
} from "@/widgets/suggestions-sidebar";
import { LazyStories, StoriesSkeleton } from "@/widgets/stories";
import { SuggestedProfiles } from "@/widgets/suggested-profiles";
import { useCreateStoryModal } from "@/widgets/create-story-modal";
import { useStoryModal } from "@/widgets/story-modal";
import { usePostModal } from "@/widgets/post-modal";

const HomePage = () => {
  const { openCreateStoryModal } = useCreateStoryModal();
  const { openStoryModal } = useStoryModal();
  const { openPostDetailsModal } = usePostModal();

  return (
    <div className="flex h-full w-full max-w-5xl">
      {/* Central Feed Column */}
      <div className="h-full w-full lg:w-[630px] flex flex-col gap-4 pt-0 md:pt-4 pb-14 md:pb-0">
        <Suspense fallback={<StoriesSkeleton />}>
          <LazyStories
            onCreateStory={openCreateStoryModal}
            onOpenStory={openStoryModal}
          />
        </Suspense>
        <Feed onOpenPost={openPostDetailsModal} />
      </div>
      {/* Right Sidebar - Suggestions (Desktop Only) */}
      <div className="hidden w-[320px] pl-16 pt-10 lg:flex flex-col gap-6">
        <AuthAppbar />
        <Suspense fallback={<SuggestionsSidebarSkeleton count={10} />}>
          <LazySuggestionsSidebar>
            <SuggestedProfiles limit={5} />
          </LazySuggestionsSidebar>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
