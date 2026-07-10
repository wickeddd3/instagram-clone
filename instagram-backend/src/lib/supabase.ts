import { createClient } from "@supabase/supabase-js";
import { config } from "@/config/env.config";

// Service-role client: verifies JWTs, performs admin auth operations, and writes
// to Storage server-side (never exposed to the browser).
export const supabase = createClient(config.supabase.url, config.supabase.serviceKey);

/**
 * Creates a Supabase Auth user with a pre-confirmed email (the backend owns
 * signup, so there is no email-verification round-trip). Returns the new user id.
 */
export const createAuthUser = async (email: string, password: string): Promise<{ id: string } | { error: string }> => {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    return { error: error.message };
  }
  return { id: data.user.id };
};

/** Deletes an auth user. Used to roll back a half-finished signup. */
export const deleteAuthUser = async (userId: string): Promise<void> => {
  await supabase.auth.admin.deleteUser(userId);
};

/** Signs a user in with their password and returns the resulting session. */
export const signInWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }
  return { session: data.session };
};

/**
 * Uploads a file to a public Storage bucket and returns its public URL.
 * `upsert` lets a user overwrite their previous avatar at the same path.
 */
export const uploadPublicFile = async (
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string,
): Promise<string> => {
  const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType, upsert: true });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
};

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
