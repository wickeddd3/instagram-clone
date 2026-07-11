import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { client } from "./providers/apollo.ts";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "@/entities/profile";
import { DrawerProvider } from "@/shared/lib/drawer";
import { ModalProvider } from "@/shared/lib/modal";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";

export const App = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AuthProvider>
          <DrawerProvider>
            <ModalProvider>
              <RouterProvider router={router} />
            </ModalProvider>
          </DrawerProvider>
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
