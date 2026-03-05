import { lazy, Suspense } from "react";
import { Feed } from "@/widgets/feed";
import { AuthAppbar, Footer } from "@/widgets/navigation";
import { SuggestionsSidebarSkeleton } from "@/widgets/suggestions-sidebar";
import { StoriesSkeleton } from "@/widgets/stories";

const Stories = lazy(() =>
  import("@/widgets/stories/LazyStories").then((m) => ({ default: m.Stories })),
);
const SuggestionsSidebar = lazy(() =>
  import("@/widgets/suggestions-sidebar/LazySuggestionsSidebar").then((m) => ({
    default: m.SuggestionsSidebar,
  })),
);

const HomePage = () => {
  return (
    <div className="flex h-full w-full max-w-5xl">
      {/* Central Feed Column */}
      <div className="h-full w-full lg:w-[630px] flex flex-col gap-4 pt-0 md:pt-4 pb-14 md:pb-0">
        <Suspense fallback={<StoriesSkeleton />}>
          <Stories />
        </Suspense>
        <Feed />
      </div>
      {/* Right Sidebar - Suggestions (Desktop Only) */}
      <div className="hidden w-[320px] pl-16 pt-10 lg:flex flex-col gap-6">
        <AuthAppbar />
        <Suspense fallback={<SuggestionsSidebarSkeleton count={10} />}>
          <SuggestionsSidebar />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
