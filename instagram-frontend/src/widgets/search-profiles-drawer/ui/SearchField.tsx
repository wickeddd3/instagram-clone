import { XCircle } from "lucide-react";

export const SearchField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative mb-6">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        aria-label="Search profiles"
        className="w-full bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          title="Clear search"
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300 cursor-pointer"
        >
          <XCircle size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
