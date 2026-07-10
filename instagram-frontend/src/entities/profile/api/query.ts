import { gql } from "@apollo/client";
import { PROFILE_FRAGMENT } from "./fragment";

export const GET_PROFILE_BY_ID = gql`
  query GetProfileById($id: ID!) {
    getProfileById(id: $id) {
      ...ProfileFields
      postsCount
      followersCount
      followingCount
      isFollowing
      isMe
    }
  }

  ${PROFILE_FRAGMENT}
`;
