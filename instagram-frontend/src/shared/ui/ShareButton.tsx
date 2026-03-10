export const ShareButton = ({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="text-indigo-400 font-semibold text-sm hover:text-indigo-300 hover:underline transition disabled:opacity-50 pr-4 cursor-pointer"
    >
      {loading ? "Sharing..." : "Share"}
    </button>
  );
};
