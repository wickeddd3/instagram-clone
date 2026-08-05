import { createClient } from "@supabase/supabase-js";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { config } from "@/config/env.config";

// Service-role client: verifies JWTs, performs admin auth operations, and writes
// to Storage server-side (never exposed to the browser).
export const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

// Anon (public) client used only for the signup flow. Unlike admin.createUser,
// the public signUp leaves the email unconfirmed and makes Supabase send its
// built-in verification email. Sessions are never persisted server-side.
const supabaseAnon = createClient(config.supabase.url, config.supabase.anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * Registers a new Supabase Auth user via the public signup flow: the account is
 * created unconfirmed and Supabase emails a verification link. Returns the new
 * user id, or an error message. An already-registered email is reported as an
 * error (Supabase signals this with an empty `identities` array rather than an
 * error, to avoid leaking which emails exist).
 */
export const signUpUser = async (email: string, password: string): Promise<{ id: string } | { error: string }> => {
  const { data, error } = await supabaseAnon.auth.signUp({
    email,
    password,
    // Where Supabase redirects after the user clicks the verification link.
    options: { emailRedirectTo: `${config.appUrl}/accounts/login` },
  });
  if (error) {
    return { error: error.message };
  }
  if (!data.user || data.user.identities?.length === 0) {
    return { error: "Email is already registered" };
  }
  return { id: data.user.id };
};

/** Deletes an auth user. Used to roll back a half-finished signup. */
export const deleteAuthUser = async (userId: string): Promise<void> => {
  await supabase.auth.admin.deleteUser(userId);
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
