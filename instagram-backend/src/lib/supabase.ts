import { createClient } from "@supabase/supabase-js";
import { config } from "../config/env.config";

// Service-role client used only to verify JWTs server-side (never exposed).
export const supabase = createClient(config.supabase.url, config.supabase.serviceKey);

export const verifySupabaseToken = async (token: string) => {
  if (!token) return null;

  // Remove "Bearer " prefix if it exists
  const jwt = token.replace("Bearer ", "");

  // This calls Supabase to verify the token is valid and active
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(jwt);

  // Invalid/expired tokens are an expected condition for unauthenticated
  // requests, so we simply return null rather than logging noise.
  if (error || !user) {
    return null;
  }

  return user.id; // Returns the UUID of the user
};
