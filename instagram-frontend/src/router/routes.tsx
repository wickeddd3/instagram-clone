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
        path: "profile",
        lazy: () =>
          import("../pages/Profile").then((module) => ({
            element: <module.default />,
          })),
      },
    ],
  },

  // --- PUBLIC/AUTH ROUTES ---
  {
    path: "/auth",
    // These routes do not require the user to be logged in
    lazy: () =>
      import("../pages/Auth").then((module) => ({
        element: <module.default />,
      })),
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
