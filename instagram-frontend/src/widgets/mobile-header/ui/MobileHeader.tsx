import { Heart } from "lucide-react";
import { MobileSearch } from "./MobileSearch";

export const MobileHeader = () => {
  return (
    <header className="w-full px-3 py-2 bg-background flex items-center justify-between">
      <h1
        className="text-3xl font-medium"
        style={{ fontFamily: "Grand Hotel, cursive" }}
      >
        Instagram
      </h1>
      <div className="flex gap-3">
        <MobileSearch />
        <button aria-label="Menu" className="text-foreground cursor-pointer">
          <Heart size={24} />
        </button>
      </div>
    </header>
  );
};
