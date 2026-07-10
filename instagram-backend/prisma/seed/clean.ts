import { config } from "@/config/env.config";
import { prisma } from "@/lib/prisma";
import { cleanUsers } from "./seeders/users.seeder";

// Clean entry point. Removes everything the seeders created; runs against
// whatever the current env points at. Add a cleaner call here per new domain.
async function main(): Promise<void> {
  console.log(`Cleaning → ${config.supabase.url}`);
  try {
    await cleanUsers();
    console.log("\nClean complete.");
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error: unknown) => {
  console.error("Clean failed:", error);
  process.exitCode = 1;
});
