import { MoreHorizontal } from "lucide-react";
import { formatDateToNow } from "@/shared/utils/date";
import { Link } from "react-router-dom";

export const PostHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};

export const CreatedAt = ({ createdAt }: { createdAt?: string }) => {
  if (!createdAt) return null;

  return (
    <span className="text-gray-500 text-sm">
      • {formatDateToNow(createdAt)}
    </span>
  );
};

export const Options = () => {
  return (
    <MoreHorizontal className="cursor-pointer hover:text-gray-400" size={20} />
  );
};

export const AuthorAvatar = ({
  avatarUrl,
  username,
  className,
}: {
  avatarUrl?: string;
  username?: string;
  className?: string;
}) => {
  if (!avatarUrl) return null;

  return (
    <div className={`w-8 h-8 rounded-full p-0.5 ${className}`}>
      <div className="bg-[#0d1015] p-0.5 rounded-full w-full h-full">
        <img
          src={avatarUrl || "/ig-default.jpg"}
          alt={`${username}-avatar`}
          className="rounded-full w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export const AuthorUsername = ({ username }: { username?: string }) => {
  if (!username) return null;

  return (
    <Link to={`/${username}`} className="font-semibold text-sm">
      {username}
    </Link>
  );
};

PostHeader.CreatedAt = CreatedAt;
PostHeader.Options = Options;
PostHeader.AuthorAvatar = AuthorAvatar;
PostHeader.AuthorUsername = AuthorUsername;
