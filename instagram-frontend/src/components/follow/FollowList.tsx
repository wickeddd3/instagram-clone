import type { ProfileData } from "../../types/profile";
import { FollowItem } from "./FollowItem";

interface FollowListProps {
  profiles: ProfileData[];
  type: string;
}

export const FollowList = ({ profiles, type }: FollowListProps) => {
  return (
    <ul className="flex-1 flex flex-col overflow-y-auto">
      {profiles.map((profile) => (
        <FollowItem key={profile.id} profile={profile} type={type} />
      ))}
    </ul>
  );
};
