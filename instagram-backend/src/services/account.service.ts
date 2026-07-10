import type { PrismaClient } from "../client";
import { BadRequestError, ConflictError } from "../errors/app.error";
import { createAuthUser, deleteAuthUser, signInWithPassword, uploadPublicFile } from "../lib/supabase";

const AVATAR_BUCKET = "avatars";

interface SignupInput {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

export interface UploadFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

/**
 * Owns account lifecycle operations that span Supabase (auth + storage) and the
 * Postgres profile table. Kept out of the pure-Prisma domain services because it
 * coordinates external side-effects and must roll them back on partial failure.
 */
export class AccountService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates the Supabase auth user, the profile row, and a session in one call.
   * If profile creation fails after the auth user exists, the auth user is
   * deleted so a retry isn't blocked by an orphaned account.
   */
  async signup({ email, password, username, displayName }: SignupInput) {
    const existing = await this.prisma.profile.findFirst({
      where: { OR: [{ email }, { username }] },
      select: { email: true, username: true },
    });
    if (existing) {
      const field = existing.email === email ? "Email" : "Username";
      throw new ConflictError(`${field} is already taken`);
    }

    const created = await createAuthUser(email, password);
    if ("error" in created) {
      throw new ConflictError(created.error);
    }

    let profile;
    try {
      profile = await this.prisma.profile.create({
        data: { id: created.id, email, username, displayName },
      });
    } catch (err) {
      await deleteAuthUser(created.id);
      throw err;
    }

    const signedIn = await signInWithPassword(email, password);
    if ("error" in signedIn) {
      throw new BadRequestError(signedIn.error);
    }

    const { access_token, refresh_token, expires_at, expires_in, token_type } = signedIn.session;
    return {
      profile,
      session: { access_token, refresh_token, expires_at, expires_in, token_type },
    };
  }

  /**
   * Uploads an avatar to the public `avatars` bucket under the user's folder and
   * persists the resulting public URL on their profile.
   */
  async uploadAvatar(userId: string, file: UploadFile) {
    const ext = file.originalname.split(".").pop() ?? file.mimetype.split("/").pop() ?? "bin";
    const path = `${userId}/${String(Date.now())}.${ext}`;

    const avatarUrl = await uploadPublicFile(AVATAR_BUCKET, path, file.buffer, file.mimetype);

    return await this.prisma.profile.update({
      where: { id: userId },
      data: { avatarUrl },
    });
  }
}
