export interface ProfileData {
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
}

export interface ProfileDataById {
  getProfileById: ProfileData;
}

export interface ProfileDataByUsername {
  getProfile: ProfileData;
}

export interface FollowersData {
  getFollowers: ProfileData[];
}

export interface FollowingData {
  getFollowing: ProfileData[];
}

export interface SearchResultsData {
  searchProfiles: ProfileData[];
}

export interface RecentSearchesData {
  getRecentSearches: ProfileData[];
}

export interface SuggestedProfilesData {
  getSuggestedProfiles: ProfileData[];
}
