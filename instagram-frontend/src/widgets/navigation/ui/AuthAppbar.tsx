import { useAuth } from "@/entities/profile";

export const AuthAppbar = () => {
  const { authProfile } = useAuth();

  if (!authProfile) return null;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <img
          src={authProfile?.avatarUrl || "/ig-default.jpg"}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-sm">
          <div className="font-semibold">{authProfile?.username}</div>
          <div className="text-gray-400">{authProfile?.displayName}</div>
        </div>
      </div>
    </div>
  );
};
