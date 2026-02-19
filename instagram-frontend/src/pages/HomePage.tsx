import { Stories } from "../components/Stories";
import { AuthUser } from "../components/AuthUser";
import { SuggestionsSidebar } from "../components/layouts/SuggestionsSidebar";
import { Feed } from "@/widgets/feed";

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
        <AuthUser />
        <SuggestionsSidebar />
        {/* Footer Links */}
        <div className="mt-8 text-xs text-gray-500 space-y-4">
          <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
          <p>© 2023 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
