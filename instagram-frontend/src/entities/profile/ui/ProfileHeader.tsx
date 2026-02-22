import { Cog } from "lucide-react";

export const ProfileHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex flex-row items-center gap-8 md:gap-12">
      {children}
    </header>
  );
};

export const Avatar = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div className="w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full bg-gray-800 overflow-hidden">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const DisplayName = ({ name }: { name: string }) => {
  return <h1 className="text-sm font-normal">{name}</h1>;
};

export const Username = ({ name }: { name: string }) => {
  return <h2 className="text-2xl font-bold">{name}</h2>;
};

export const Bio = ({ text }: { text: string }) => {
  return <p className="text-sm">{text}</p>;
};

export const SettingsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:text-gray-400 transition cursor-pointer"
    >
      <Cog size={24} />
    </button>
  );
};

export const ActionButton = ({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`w-full bg-gray-800 hover:bg-gray-700 text-white p-1.5 md:p-3 rounded-lg md:rounded-xl text-sm font-semibold transition cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const Stats = ({
  postsCount,
  followersCount,
  followingCount,
  onClickFollowers,
  onClickFollowing,
}: {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  onClickFollowers: () => void;
  onClickFollowing: () => void;
}) => {
  return (
    <div className="hidden md:flex gap-10">
      <span className="text-sm">
        <strong>{postsCount}</strong> posts
      </span>
      <span onClick={onClickFollowers} className="text-sm cursor-pointer">
        <strong>{followersCount}</strong> followers
      </span>
      <span onClick={onClickFollowing} className="text-sm cursor-pointer">
        <strong>{followingCount}</strong> following
      </span>
    </div>
  );
};

ProfileHeader.Avatar = Avatar;
ProfileHeader.DisplayName = DisplayName;
ProfileHeader.Username = Username;
ProfileHeader.Bio = Bio;
ProfileHeader.SettingsButton = SettingsButton;
ProfileHeader.ActionButton = ActionButton;
ProfileHeader.Stats = Stats;
