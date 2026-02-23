import { gql } from "@apollo/client";

export const REMOVE_PROFILE_AVATAR = gql`
  mutation RemoveProfileAvatar {
    removeProfileAvatar {
      id
      avatarUrl
    }
  }
`;
