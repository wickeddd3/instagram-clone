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
      className="text-primary font-semibold text-sm hover:text-primary-hover hover:underline transition disabled:opacity-50 pr-4 cursor-pointer"
    >
      {loading ? "Sharing..." : "Share"}
    </button>
  );
};
