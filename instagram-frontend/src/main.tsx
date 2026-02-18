import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { App } from "./App.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { client } from "./lib/apollo.ts";
import { PostProvider } from "./contexts/PostContext.tsx";
import { ModalProvider } from "./contexts/ModalContext.tsx";
import { DrawerProvider } from "./contexts/DrawerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <DrawerProvider>
          <ModalProvider>
            <PostProvider>
              <App />
            </PostProvider>
          </ModalProvider>
        </DrawerProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
