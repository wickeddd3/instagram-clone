import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Automated WCAG 2.1 A/AA scan of the unauthenticated surfaces the e2e harness
// can reach without a Supabase session (login, signup, and the AuthGuard login
// gate). Any violation fails CI, guarding against accessibility regressions.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

const scan = async (page: import("@playwright/test").Page) =>
  new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

test.describe("Accessibility (axe)", () => {
  test("login page has no WCAG violations", async ({ page }) => {
    await page.goto("/accounts/login");
    await expect(page.getByRole("heading", { name: "Instagram" })).toBeVisible();

    const results = await scan(page);
    expect(results.violations).toEqual([]);
  });

  test("signup page has no WCAG violations", async ({ page }) => {
    await page.goto("/accounts/signup");
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();

    const results = await scan(page);
    expect(results.violations).toEqual([]);
  });

  test("login gate at the app root has no WCAG violations", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Instagram" })).toBeVisible();

    const results = await scan(page);
    expect(results.violations).toEqual([]);
  });
});
