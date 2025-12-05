import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layouts/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("../pages/Home").then((module) => ({
            element: <module.default />,
          })),
      },
    ],
  },
]);
