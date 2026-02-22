import { useAuth } from "@/app/providers/AuthContext";

export const AuthAppbar = () => {
  const { authUser } = useAuth();

  if (!authUser?.getProfileById) return null;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <img
          src={authUser?.getProfileById.avatarUrl || "/ig-default.jpg"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-sm">
          <div className="font-semibold">
            {authUser?.getProfileById.username}
          </div>
          <div className="text-gray-500">
            {authUser?.getProfileById.displayName}
          </div>
        </div>
      </div>
    </div>
  );
};
