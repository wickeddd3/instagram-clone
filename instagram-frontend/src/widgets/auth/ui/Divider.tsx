export const Divider = () => {
  return (
    <div className="w-full flex justify-center items-center gap-4">
      <div className="flex-1 border-t border-border"></div>
      <span className="w-fit text-sm font-bold text-muted">OR</span>
      <div className="flex-1 border-t border-border"></div>
    </div>
  );
};
