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
