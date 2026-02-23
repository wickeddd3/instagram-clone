import { gql } from "@apollo/client";

export const UPLOAD_PROFILE_AVATAR = gql`
  mutation UploadProfileAvatar($avatarUrl: String!) {
    uploadProfileAvatar(avatarUrl: $avatarUrl) {
      id
      avatarUrl
    }
  }
`;
