import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { client } from "./providers/apollo.ts";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "@/entities/profile";
import { DrawerProvider } from "@/shared/lib/drawer";
import { ModalProvider } from "@/shared/lib/modal";

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
