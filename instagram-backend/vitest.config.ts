import { defineConfig } from "vitest/config";

export default defineConfig({
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
