import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { App } from "./App.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { client } from "./lib/apollo.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
