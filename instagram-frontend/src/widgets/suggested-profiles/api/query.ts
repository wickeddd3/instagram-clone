import { PROFILE_FRAGMENT } from "@/entities/profile";
import { gql } from "@apollo/client";

export const GET_SUGGESTED_PROFILES = gql`
  query GetSuggestedProfiles($limit: Int) {
    getSuggestedProfiles(limit: $limit) {
      ...ProfileFields
      followersCount
      mutualFriend
    }
  }

  ${PROFILE_FRAGMENT}
`;
