import { RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { router } from "./router/routes";
import { client } from "./providers/apollo.ts";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "@/entities/profile";
import { DrawerProvider } from "@/shared/lib";
import { ModalProvider } from "@/shared/lib";
import { ErrorBoundary } from "@/shared/ui";

export const App = () => {
  return (
    <ErrorBoundary>
      {/* `reducedMotion="user"` makes every framer-motion animation honor the
          viewer's prefers-reduced-motion setting (WCAG 2.3.3). */}
      <MotionConfig reducedMotion="user">
        <ApolloProvider client={client}>
          <AuthProvider>
            <DrawerProvider>
              <ModalProvider>
                <RouterProvider router={router} />
              </ModalProvider>
            </DrawerProvider>
          </AuthProvider>
        </ApolloProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
};
