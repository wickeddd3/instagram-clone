import { test, expect } from "@playwright/test";

// These specs cover the unauthenticated entry points only: the GuestGuard login
// and signup pages plus the AuthGuard redirect-to-login behavior. They exercise
// client-side rendering, routing, and Zod validation, so they need no Supabase
// session or backend — submitting empty forms is blocked before any network call.

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/accounts/login");
  });

  test("renders the login form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Instagram" }),
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("Phone number, username, or email"),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  });

  test("shows validation errors when submitting an empty form", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText("Email Required")).toBeVisible();
    await expect(page.getByText("Password Required")).toBeVisible();
    // Still on the login page — no navigation happened.
    await expect(page).toHaveURL(/\/accounts\/login$/);
  });

  test("navigates to the signup page via the sign-up link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /sign up/i }).click();

    await expect(page).toHaveURL(/\/accounts\/signup$/);
    await expect(
      page.getByRole("button", { name: "Sign up" }),
    ).toBeVisible();
  });
});

test.describe("Signup page", () => {
  test("renders every signup field", async ({ page }) => {
    await page.goto("/accounts/signup");

    await expect(page.getByPlaceholder("Mobile Number or Email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByPlaceholder("Full Name")).toBeVisible();
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  });

  test("shows validation errors when submitting an empty form", async ({
    page,
  }) => {
    await page.goto("/accounts/signup");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByText("Email Required")).toBeVisible();
    await expect(page.getByText("Password Required")).toBeVisible();
    await expect(page.getByText("Full Name Required")).toBeVisible();
    await expect(page.getByText("Username Required")).toBeVisible();
  });
});

test.describe("Route guards", () => {
  test("an unauthenticated visit to a protected route renders the login gate", async ({
    page,
  }) => {
    await page.goto("/");

    // AuthGuard renders the MainLogin widget in place when there is no session,
    // so the login form is reachable from the app root without a redirect.
    await expect(
      page.getByRole("heading", { name: "Instagram" }),
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("Phone number, username, or email"),
    ).toBeVisible();
  });
});
