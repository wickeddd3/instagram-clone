import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_KEY are required.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

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
