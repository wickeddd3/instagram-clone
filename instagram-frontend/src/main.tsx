import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { App } from "./App.tsx";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_API_URL }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </StrictMode>
);
