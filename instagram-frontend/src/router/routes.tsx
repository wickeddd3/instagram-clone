import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../components/AuthGuard";

export const router = createBrowserRouter([
  // --- PROTECTED ROUTES ---
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        index: true,
        lazy: () =>
          import("../pages/Home").then((module) => ({
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
          import("../pages/EditProfile").then((module) => ({
            element: <module.default />,
          })),
      },
    ],
  },

  // --- PUBLIC/AUTH ROUTES ---
  {
    path: "/accounts",
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
