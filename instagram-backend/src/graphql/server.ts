import type { Server } from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs, resolvers } from "./index";
import type { GraphQLContext } from "./context";
import { config } from "../config/env.config";

/**
 * Builds the Apollo server. The drain plugin ties graceful shutdown to the HTTP
 * server, and formatError hides unexpected-error details in production.
 */
export const createApolloServer = (httpServer: Server): ApolloServer<GraphQLContext> =>
  new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: !config.isProduction,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (formattedError) => {
      if (config.isProduction && formattedError.extensions?.code === "INTERNAL_SERVER_ERROR") {
        return { ...formattedError, message: "Internal server error" };
      }
      return formattedError;
    },
  });
