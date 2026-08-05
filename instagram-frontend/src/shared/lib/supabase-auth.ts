import { supabase } from "./supabase";

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

// Triggers Supabase's secure email-change flow. The address does not change
// until the user confirms the link sent to the new email, so callers should
// surface a "check your inbox" state rather than treating this as done.
export const updateEmail = async (email: string) => {
  return await supabase.auth.updateUser({ email });
};

export const updatePassword = async (password: string) => {
  return await supabase.auth.updateUser({ password });
};

// Verifies the user's current password by re-signing in. On success this
// refreshes the same user's session; on failure it returns an error without
// touching the existing session, so we can gate sensitive changes behind it.
export const reauthenticate = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};
