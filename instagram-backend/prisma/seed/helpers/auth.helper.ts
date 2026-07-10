import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const PER_PAGE = 200;
const MAX_PAGES = 100;

/**
 * Looks up a Supabase auth user by email. supabase-js has no get-by-email admin
 * call, so this pages through listUsers — fine for the small, one-off seed set.
 */
export async function findAuthUserByEmail(email: string): Promise<User | null> {
  const target = email.toLowerCase();
  for (let page = 1; page <= MAX_PAGES; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: PER_PAGE });
    if (error) throw new Error(`listUsers failed: ${error.message}`);

    const match = data.users.find((u) => u.email?.toLowerCase() === target);
    if (match) return match;
    if (data.users.length < PER_PAGE) return null; // reached the last page
  }
  return null;
}

/**
 * Creates a pre-confirmed Supabase auth user, or — if the email already exists —
 * resets its password so the seed account stays usable. Returns the user id
 * (which doubles as the Profile primary key).
 */
export async function upsertAuthUser(email: string, password: string): Promise<string> {
  const created = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
  if (!created.error) {
    return created.data.user.id;
  }

  const existing = await findAuthUserByEmail(email);
  if (!existing) {
    throw new Error(`Could not create or find auth user ${email}: ${created.error.message}`);
  }

  const updated = await supabase.auth.admin.updateUserById(existing.id, { password, email_confirm: true });
  if (updated.error) {
    throw new Error(`updateUserById failed for ${email}: ${updated.error.message}`);
  }
  return existing.id;
}

/** Deletes a Supabase auth user by id. */
export async function deleteAuthUser(id: string): Promise<void> {
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) throw new Error(`deleteUser failed for ${id}: ${error.message}`);
}
