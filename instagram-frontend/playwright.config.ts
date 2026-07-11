import { defineConfig, devices } from "@playwright/test";

// E2E specs live in `e2e/` (separate from Vitest's `src/**/*.spec.tsx`), so the
// two runners never pick up each other's files. Playwright boots the Vite dev
// server itself via `webServer` below and drives it through a real browser.
const PORT = 5173;
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  // Fail the CI build if a `test.only` is accidentally committed.
  forbidOnly: !!process.env.CI,
  // Retry flaky specs on CI only; locally a failure should surface immediately.
  retries: process.env.CI ? 2 : 0,
  // Deterministic ordering on CI; use all cores locally.
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "html",
  use: {
    baseURL: BASE_URL,
    // Capture a trace on the first retry so failures are debuggable without
    // paying the collection cost on every run.
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Reuse the app the developer already has running locally; on CI always start
  // a fresh dev server. The Vite server reads instagram-frontend/.env for the
  // Supabase vars it needs to boot.
  webServer: {
    command: "yarn dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
