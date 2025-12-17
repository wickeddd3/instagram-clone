import { Heart } from "lucide-react";

export const MobileHeader = () => {
  return (
    <header className="w-full p-3 bg-black border-b border-gray-800 flex items-center justify-between">
      <h1
        className="text-2xl font-medium"
        style={{ fontFamily: "Grand Hotel, cursive" }}
      >
        Instagram
      </h1>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 text-white rounded-full py-2 px-3 text-sm placeholder:text-sm placeholder:font-light focus:outline-none"
        />
        <button aria-label="Menu" className="text-white cursor-pointer">
          <Heart size={24} />
        </button>
      </div>
    </header>
  );
};
