import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "./../providers/AuthGuard";
import { GuestGuard } from "./../providers/GuestGuard";
import { RouteErrorBoundary } from "./RouteErrorBoundary";

export const router = createBrowserRouter([
  // --- PROTECTED ROUTES ---
  {
    path: "/",
    element: <AuthGuard />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/pages/home");
          return { Component: module.default };
        },
      },
      {
        path: ":username",
        lazy: async () => {
          const module = await import("@/pages/profile");
          return { Component: module.default };
        },
      },
      {
        path: "accounts/edit",
        lazy: async () => {
          const module = await import("@/pages/edit-profile");
          return { Component: module.default };
        },
      },
      {
        path: "explore",
        lazy: async () => {
          const module = await import("@/pages/explore");
          return { Component: module.default };
        },
      },
      {
        path: "explore/people",
        lazy: async () => {
          const module = await import("@/pages/explore-people");
          return { Component: module.default };
        },
      },
      {
        path: "inbox",
        lazy: async () => {
          const module = await import("@/pages/inbox");
          return { Component: module.default };
        },
      },
    ],
  },

  // --- PUBLIC/AUTH ROUTES ---
  {
    path: "/accounts",
    element: <GuestGuard />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "login",
        lazy: async () => {
          const module = await import("@/pages/login");
          return { Component: module.default };
        },
      },
      {
        path: "signup",
        lazy: async () => {
          const module = await import("@/pages/signup");
          return { Component: module.default };
        },
      },
    ],
  },

  // --- 404/Catch-all ---
  {
    path: "*",
    element: (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <h1>404 | Page Not Found</h1>
      </div>
    ),
  },
]);
