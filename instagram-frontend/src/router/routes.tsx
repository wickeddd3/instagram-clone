import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../components/AuthGuard";
import { GuestGuard } from "../components/GuestGuard";

export const router = createBrowserRouter([
  // --- PROTECTED ROUTES ---
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        index: true,
        lazy: () =>
          import("../pages/HomePage").then((module) => ({
            element: <module.default />,
          })),
      },
      {
        path: ":username",
        lazy: () =>
          import("../pages/ProfilePage").then((module) => ({
            element: <module.default />,
          })),
      },
      {
        path: "accounts/edit",
        lazy: () =>
          import("../pages/EditProfilePage").then((module) => ({
            element: <module.default />,
          })),
      },
      {
        path: "explore",
        lazy: () =>
          import("../pages/ExplorePage").then((module) => ({
            element: <module.default />,
          })),
      },
      {
        path: "explore/people",
        lazy: () =>
          import("../pages/ExplorePeoplePage").then((module) => ({
            element: <module.default />,
          })),
      },
      {
        path: "inbox",
        lazy: () =>
          import("../pages/InboxPage").then((module) => ({
            element: <module.default />,
          })),
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
        lazy: () =>
          import("../pages/LoginPage").then((module) => ({
            element: <module.default />,
          })),
      },
      {
        path: "signup",
        lazy: () =>
          import("../pages/SignupPage").then((module) => ({
            element: <module.default />,
          })),
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
