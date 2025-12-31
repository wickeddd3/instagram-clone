import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { json } from "body-parser";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { verifySupabaseToken } from "./lib/supabase";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        // 1. Get the Authorization header (Bearer <token>)
        const authHeader = req.headers.authorization;
        // 2. Verify it and get the User UUID
        const userId = await verifySupabaseToken(authHeader || "");
        // 3. Return the userId to be used in resolvers
        return { userId };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

startServer();
