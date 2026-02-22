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
        className="w-full bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 cursor-pointer"
        >
          <XCircle size={16} />
        </button>
      )}
    </div>
  );
};
