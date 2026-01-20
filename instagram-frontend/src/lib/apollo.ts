import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { supabase } from "./supabase";

const baseLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const authLink = new SetContextLink((prevContext, _) => {
  return new Promise(async (resolve) => {
    // Get the current session from Supabase
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    // Set the authorization header
    const headers = {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    };

    resolve({ headers });
  });
});

export const client = new ApolloClient({
  link: authLink.concat(baseLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getFeedPosts: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                // Append the new posts to the existing ones
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
          getExplorePosts: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
          getProfilePosts: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
          getSavedPosts: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
          getComments: {
            // Crucial: separate the cache by postId
            keyArgs: ["postId"],
            merge(existing, incoming) {
              return {
                ...incoming,
                comments: [...(existing?.comments || []), ...incoming.comments],
              };
            },
          },
        },
      },
    },
  }),
});
