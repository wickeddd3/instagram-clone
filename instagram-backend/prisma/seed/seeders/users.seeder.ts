import { prisma } from "@/lib/prisma";
import type { SeedUser } from "../types";
import usersJson from "../data/users.json";
import { deleteAuthUser, findAuthUserByEmail, upsertAuthUser } from "../helpers/auth.helper";

// One password for every seed account — local/dev convenience only. Change it
// (or wire it to an env var) before seeding anything that matters.
const SEED_PASSWORD = "password123";

const users: SeedUser[] = usersJson;

/**
 * Upserts a Supabase auth user and its Postgres profile for each seed identity.
 * Idempotent: re-running overwrites existing accounts rather than failing.
 */
export async function seedUsers(): Promise<void> {
  for (const user of users) {
    const id = await upsertAuthUser(user.email, SEED_PASSWORD);
    await prisma.profile.upsert({
      where: { id },
      create: {
        id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      },
      update: {
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      },
    });
    console.log(`  ✓ ${user.username} <${user.email}> (${id})`);
  }
  console.log(`Seeded ${String(users.length)} users. Shared password: ${SEED_PASSWORD}`);
}

/** Removes the profile and auth user for each seed identity. Idempotent. */
export async function cleanUsers(): Promise<void> {
  for (const user of users) {
    const existing = await findAuthUserByEmail(user.email);

    // Delete the profile first (by id when known, else by email), then auth.
    if (existing) {
      await prisma.profile.deleteMany({ where: { id: existing.id } });
      await deleteAuthUser(existing.id);
    } else {
      await prisma.profile.deleteMany({ where: { email: user.email } });
    }
    console.log(`  ✓ removed ${user.username} <${user.email}>`);
  }
  console.log(`Removed ${String(users.length)} users.`);
}
