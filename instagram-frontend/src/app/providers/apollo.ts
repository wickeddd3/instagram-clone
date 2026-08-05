import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";
import { toast } from "sonner";
import { supabase, signOut } from "@/shared/lib";
import { env } from "@/shared/config";

const baseLink = new HttpLink({
  uri: env.VITE_API_URL,
});

const authLink = new SetContextLink(async (prevContext) => {
  // Get the current session from Supabase
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  // Set the authorization header
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Single place to react to auth-expiry and surface transport failures, so no
// query/mutation has to re-implement it. UNAUTHENTICATED (the backend's typed
// GraphQL code) or a 401 means the Supabase access token is no longer valid:
// signing out lets AuthProvider's onAuthStateChange clear the session and the
// route guards redirect to login. The flag prevents a burst of failed requests
// from triggering repeated sign-outs.
let handlingAuthExpiry = false;

const handleAuthExpiry = async () => {
  if (handlingAuthExpiry) return;
  handlingAuthExpiry = true;
  toast.error("Your session has expired. Please sign in again.", {
    id: "auth-expiry",
  });
  await signOut();
  handlingAuthExpiry = false;
};

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    if (error.errors.some((e) => e.extensions?.code === "UNAUTHENTICATED")) {
      void handleAuthExpiry();
    }
    return;
  }

  if (ServerError.is(error) && error.statusCode === 401) {
    void handleAuthExpiry();
    return;
  }

  // Network / transport failure (offline, CORS, server unreachable, 5xx). The
  // stable toast id collapses concurrent failures into a single notification.
  toast.error("Network error. Please check your connection and try again.", {
    id: "network-error",
  });
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, baseLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getFeedPosts: {
            keyArgs: ["profileId"],
            merge(existing, incoming) {
              const existingPosts = existing?.posts || [];
              const incomingPosts = incoming?.posts || [];
              return {
                ...incoming,
                posts: [...existingPosts, ...incomingPosts],
              };
            },
          },
          getExplorePosts: {
            keyArgs: ["profileId"],
            merge(existing, incoming) {
              const existingPosts = existing?.posts || [];
              const incomingPosts = incoming?.posts || [];
              return {
                ...incoming,
                posts: [...existingPosts, ...incomingPosts],
              };
            },
          },
          getProfilePosts: {
            keyArgs: ["profileId"],
            merge(existing, incoming) {
              const existingPosts = existing?.posts || [];
              const incomingPosts = incoming?.posts || [];
              return {
                ...incoming,
                posts: [...existingPosts, ...incomingPosts],
              };
            },
          },
          getSavedPosts: {
            keyArgs: ["profileId"],
            merge(existing, incoming) {
              const existingPosts = existing?.posts || [];
              const incomingPosts = incoming?.posts || [];
              return {
                ...incoming,
                posts: [...existingPosts, ...incomingPosts],
              };
            },
          },
          getComments: {
            // Crucial: separate the cache by postId
            keyArgs: ["postId", "parentId"],
            merge(existing, incoming) {
              const existingComments = existing?.comments || [];
              const incomingComments = incoming?.comments || [];
              return {
                ...incoming,
                comments: [...existingComments, ...incomingComments],
              };
            },
          },
          getFollowers: {
            keyArgs: ["username"],
            merge(existing, incoming) {
              return {
                ...incoming,
                followers: [
                  ...(existing?.followers || []),
                  ...incoming.followers,
                ],
              };
            },
          },
          getFollowing: {
            keyArgs: ["username"],
            merge(existing, incoming) {
              return {
                ...incoming,
                following: [
                  ...(existing?.following || []),
                  ...incoming.following,
                ],
              };
            },
          },
          searchFollowers: {
            keyArgs: ["username", "query"],
            merge(existing, incoming) {
              return {
                ...incoming,
                followers: [
                  ...(existing?.followers || []),
                  ...incoming.followers,
                ],
              };
            },
          },
          searchFollowing: {
            keyArgs: ["username", "query"],
            merge(existing, incoming) {
              return {
                ...incoming,
                following: [
                  ...(existing?.following || []),
                  ...incoming.following,
                ],
              };
            },
          },
        },
      },
    },
  }),
});
