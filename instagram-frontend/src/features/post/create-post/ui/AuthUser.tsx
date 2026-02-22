export const AuthUser = ({
  avatarUrl,
  username,
}: {
  avatarUrl?: string;
  username: string;
}) => {
  return (
    <div className="p-4 flex gap-3">
      <img
        src={avatarUrl || "/ig-default.jpg"}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="text-white font-semibold text-sm">{username}</span>
    </div>
  );
};
