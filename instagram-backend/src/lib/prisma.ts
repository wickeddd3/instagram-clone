import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/client";
import { config } from "@/config/env.config";

// Bound the pool so the app can't exhaust the database's connection limit, and
// fail fast instead of hanging when no connection is available.
const adapter = new PrismaPg({
  connectionString: config.database.url,
  max: config.database.poolMax,
  connectionTimeoutMillis: config.database.connectionTimeoutMs,
});
const prisma = new PrismaClient({ adapter });

export { prisma };
