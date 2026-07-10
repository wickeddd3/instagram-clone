import { gql } from "@apollo/client";

export const CHECK_AVAILABILITY = gql`
  query CheckAvailability($email: String, $username: String) {
    checkAvailability(email: $email, username: $username) {
      isEmailAvailable
      isUsernameAvailable
    }
  }
`;
