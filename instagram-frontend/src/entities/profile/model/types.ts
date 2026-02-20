export interface Profile {
  id: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  bio: string;
  website: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isMe: boolean;
  mutualFriend?: string;
}
