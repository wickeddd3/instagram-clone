import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "@/components/AuthGuard";
import { GuestGuard } from "@/components/GuestGuard";

export const router = createBrowserRouter([
  // --- PROTECTED ROUTES ---
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/pages/HomePage");
          return { Component: module.default };
        },
      },
      {
        path: ":username",
        lazy: async () => {
          const module = await import("@/pages/ProfilePage");
          return { Component: module.default };
        },
      },
      {
        path: "accounts/edit",
        lazy: async () => {
          const module = await import("@/pages/EditProfilePage");
          return { Component: module.default };
        },
      },
      {
        path: "explore",
        lazy: async () => {
          const module = await import("@/pages/ExplorePage");
          return { Component: module.default };
        },
      },
      {
        path: "explore/people",
        lazy: async () => {
          const module = await import("@/pages/ExplorePeoplePage");
          return { Component: module.default };
        },
      },
      {
        path: "inbox",
        lazy: async () => {
          const module = await import("@/pages/InboxPage");
          return { Component: module.default };
        },
      },
    ],
  },

  // --- PUBLIC/AUTH ROUTES ---
  {
    path: "/accounts",
    element: <GuestGuard />,
    children: [
      {
        path: "login",
        lazy: async () => {
          const module = await import("@/pages/LoginPage");
          return { Component: module.default };
        },
      },
      {
        path: "signup",
        lazy: async () => {
          const module = await import("@/pages/SignupPage");
          return { Component: module.default };
        },
      },
    ],
  },

  // --- 404/Catch-all ---
  {
    path: "*",
    element: (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h1>404 | Page Not Found</h1>
      </div>
    ),
  },
]);
