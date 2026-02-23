import { Stories } from "@/widgets/stories";
import { Feed } from "@/widgets/feed";
import { AuthAppbar, Footer } from "@/widgets/navigation";
import { SuggestionsSidebar } from "@/widgets/suggestions-sidebar";

const HomePage = () => {
  return (
    <div className="flex w-full max-w-5xl">
      {/* Central Feed Column */}
      <div className="w-full lg:w-[630px] flex flex-col gap-4 pt-4">
        <Stories />
        <Feed />
      </div>
      {/* Right Sidebar - Suggestions (Desktop Only) */}
      <div className="hidden w-[320px] pl-16 pt-10 lg:flex flex-col gap-6">
        <AuthAppbar />
        <SuggestionsSidebar />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
