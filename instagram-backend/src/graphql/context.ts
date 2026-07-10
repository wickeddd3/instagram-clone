import type { Services } from "@/container";

/**
 * Per-request GraphQL context. `userId` is the Supabase user UUID when the
 * request carries a valid token, otherwise `null`. `services` is the shared
 * container (same instances the REST layer uses).
 */
export interface GraphQLContext {
  userId: string | null;
  services: Services;
}
