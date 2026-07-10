import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Mirror the tsconfig path aliases (prisma first so it wins over the `@/` catch-all).
const alias = [
  { find: /^@\/prisma\/(.*)$/, replacement: fileURLToPath(new URL("./prisma/generated/$1", import.meta.url)) },
  { find: /^@\/(.*)$/, replacement: fileURLToPath(new URL("./src/$1", import.meta.url)) },
];

export default defineConfig({
  resolve: { alias },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Hermetic env so the config module validates without a real .env or secrets.
    // These tests don't reach the database or Supabase.
    env: {
      NODE_ENV: "test",
      LOG_LEVEL: "silent",
      DATABASE_URL: "postgresql://test:test@localhost:5432/test",
      SUPABASE_URL: "http://localhost:54321",
      SUPABASE_SERVICE_KEY: "test-service-key",
    },
  },
});
