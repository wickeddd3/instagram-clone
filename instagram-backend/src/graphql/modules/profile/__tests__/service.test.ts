import { describe, it, expect, vi } from "vitest";
import { ProfileService } from "@/graphql/modules/profile/service";

// Unit test: the service is pure business logic over an injected Prisma client,
// so we can exercise it with a mock and no database.
describe("ProfileService.checkAvailability", () => {
  it("reports both fields available when no rows exist", async () => {
    const prisma = {
      profile: { findUnique: vi.fn().mockResolvedValue(null) },
    };
    const service = new ProfileService(prisma as any);

    const result = await service.checkAvailability("a@b.co", "newuser");

    expect(result).toEqual({
      isEmailAvailable: true,
      isUsernameAvailable: true,
    });
    expect(prisma.profile.findUnique).toHaveBeenCalledTimes(2);
  });

  it("reports taken when matching rows exist", async () => {
    const prisma = {
      profile: { findUnique: vi.fn().mockResolvedValue({ id: "1" }) },
    };
    const service = new ProfileService(prisma as any);

    const result = await service.checkAvailability("a@b.co", "taken");

    expect(result).toEqual({
      isEmailAvailable: false,
      isUsernameAvailable: false,
    });
  });
});
