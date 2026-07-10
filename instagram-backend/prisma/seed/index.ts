import { config } from "@/config/env.config";
import { prisma } from "@/lib/prisma";
import { seedUsers } from "./seeders/users.seeder";

// Seed entry point. Runs every seeder against whatever the current env points
// at, so it works both locally and against prod. Add a seeder call here as new
// domains are introduced.
async function main(): Promise<void> {
  console.log(`Seeding → ${config.supabase.url}`);
  try {
    await seedUsers();
    console.log("\nSeed complete.");
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
