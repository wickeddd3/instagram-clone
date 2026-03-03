import { PROFILE_FRAGMENT } from "@/entities/profile";
import { gql } from "@apollo/client";

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

export const CHECK_AVAILABILITY = gql`
  query CheckAvailability($email: String, $username: String) {
    checkAvailability(email: $email, username: $username) {
      isEmailAvailable
      isUsernameAvailable
    }
  }
`;
