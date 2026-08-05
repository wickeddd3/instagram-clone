import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// Kept separate from vite.config.ts so tests don't inherit the production build's
// manualChunks/visualizer setup — just the React plugin and the "@" alias.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    // Dummy build-time env so importing `@/shared/config` (which validates
    // VITE_* at import) works in CI, where no .env or secrets are present.
    env: {
      VITE_API_URL: "http://localhost:4000/graphql",
      VITE_REST_API_URL: "http://localhost:4000/api/v1",
      VITE_SUPABASE_URL: "http://localhost:54321",
      VITE_SUPABASE_ANON_KEY: "test-anon-key",
    },
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{ts,tsx}",
        "src/test/**",
        "src/**/index.ts",
        "src/**/*.d.ts",
      ],
    },
  },
});
