import type { Profile } from "@/entities/profile";

export interface Followers {
  getFollowers: Profile[];
}
