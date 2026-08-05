import { Cog } from "lucide-react";

export const ProfileHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex flex-row items-center gap-8 md:gap-12">
      {children}
    </header>
  );
};

export const Avatar = ({
  avatarUrl,
  username,
}: {
  avatarUrl: string;
  username?: string;
}) => {
  return (
    <div className="w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full bg-surface-hover overflow-hidden">
      <img
        src={avatarUrl}
        alt={username ? `${username}'s profile photo` : "Profile photo"}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const DisplayName = ({ name }: { name: string }) => {
  return <h1 className="text-sm font-normal">{name}</h1>;
};

export const Username = ({ name }: { name: string }) => {
  return <h2 className="text-lg md:text-2xl font-bold">{name}</h2>;
};

export const Bio = ({ text }: { text: string }) => {
  return <p className="text-sm">{text}</p>;
};

export const SettingsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Settings"
      title="Settings"
      className="p-1 hover:text-muted transition cursor-pointer"
    >
      <Cog size={24} aria-hidden="true" />
    </button>
  );
};

export const ActionButton = ({
  label,
  onClick,
  className = "",
  variant = "secondary",
}: {
  label: string;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}) => {
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover"
      : "bg-surface-hover text-foreground hover:opacity-80";

  return (
    <button
      className={`w-full ${variantClasses} p-1.5 md:p-3 rounded-lg md:rounded-xl text-sm font-semibold transition cursor-pointer ${className}`}
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
    <div className="flex gap-4 md:gap-10">
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
