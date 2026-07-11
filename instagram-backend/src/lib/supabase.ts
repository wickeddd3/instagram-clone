import { createClient } from "@supabase/supabase-js";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { config } from "@/config/env.config";

// Service-role client: verifies JWTs, performs admin auth operations, and writes
// to Storage server-side (never exposed to the browser).
export const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

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

// Local access-token verification against the project's JWKS (asymmetric ES256),
// which removes a per-request network call to supabase.auth.getUser. jose fetches
// the keys lazily on first verify, caches them, and rotates by `kid`.
const jwks = createRemoteJWKSet(new URL(`${config.supabase.url}/auth/v1/.well-known/jwks.json`));

/**
 * Resolves the Supabase user id from an access token, or null if it's invalid/
 * expired (an expected condition for anonymous requests, so no logging noise).
 * The signature, expiry, and audience are verified locally via JWKS.
 */
export const verifySupabaseToken = async (token: string): Promise<string | null> => {
  if (!token) return null;

  // Remove "Bearer " prefix if it exists
  const jwt = token.replace("Bearer ", "");

  try {
    const { payload } = await jwtVerify(jwt, jwks, { audience: "authenticated" });
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null; // invalid signature / expired / malformed
  }
};
