import { Heart } from "lucide-react";
import { MobileSearch } from "../search/MobileSearch";

export const MobileHeader = () => {
  return (
    <header className="w-full px-3 py-2 bg-[#0d1015] flex items-center justify-between">
      <h1
        className="text-3xl font-medium"
        style={{ fontFamily: "Grand Hotel, cursive" }}
      >
        Instagram
      </h1>
      <div className="flex gap-3">
        <MobileSearch />
        <button aria-label="Menu" className="text-white cursor-pointer">
          <Heart size={24} />
        </button>
      </div>
    </header>
  );
};
