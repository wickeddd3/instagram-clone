import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { json } from "body-parser";
import { typeDefs, resolvers, services } from "./graphql";
import type { GraphQLContext } from "./graphql/context";
import { verifySupabaseToken } from "./lib/supabase";
import { logger } from "./lib/logger";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Initialize Apollo Server
const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        // 1. Get the Authorization header (Bearer <token>)
        const authHeader = req.headers.authorization;
        // 2. Verify it and get the User UUID
        const userId = await verifySupabaseToken(authHeader ?? "");
        // 3. Return the userId and services to be used in resolvers
        return { userId, services };
      },
    }),
  );

  const PORT = Number(process.env.PORT) || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  logger.info(`🚀 Server ready at http://localhost:${String(PORT)}/graphql`);
};

startServer().catch((err: unknown) => {
  logger.error(err, "Failed to start server");
});
