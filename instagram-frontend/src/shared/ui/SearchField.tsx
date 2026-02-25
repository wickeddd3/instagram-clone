export const SearchField = ({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="search"
      type="text"
      placeholder="Search"
      className={`w-full px-3 py-2 bg-neutral-700 rounded-xl outline-none text-sm ${className}`}
    />
  );
};
