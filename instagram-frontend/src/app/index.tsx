import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { client } from "./providers/apollo.ts";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./providers/AuthContext.tsx";
import { DrawerProvider } from "./providers/DrawerContext.tsx";
import { ModalProvider } from "./providers/ModalContext.tsx";

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <DrawerProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </DrawerProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};
