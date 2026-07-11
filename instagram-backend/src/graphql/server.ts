import type { Server } from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloArmor } from "@escape.tech/graphql-armor";
import { typeDefs, resolvers } from "./index";
import type { GraphQLContext } from "./context";
import { config } from "@/config/env.config";

// Abuse protection: bound query depth, cost, aliases, tokens, and directives so
// a single malicious or accidentally-expensive operation can't exhaust the
// server. Batched requests are disabled and field-name suggestions are hidden in
// production (they can leak the schema when introspection is off).
const armor = new ApolloArmor({
  maxDepth: { n: 10 },
  costLimit: { maxCost: 5000, ignoreIntrospection: true },
  maxAliases: { n: 15 },
  maxDirectives: { n: 50 },
  maxTokens: { n: 2000 },
  blockFieldSuggestion: { enabled: config.isProduction },
});

/**
 * Builds the Apollo server. graphql-armor's plugins + validation rules guard the
 * schema, the drain plugin ties graceful shutdown to the HTTP server, and
 * formatError hides unexpected-error details in production.
 */
export const createApolloServer = (httpServer: Server): ApolloServer<GraphQLContext> => {
  const protection = armor.protect();

  return new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: !config.isProduction,
    ...protection,
    // Append the drain plugin to armor's plugins, and keep stack traces in dev.
    plugins: [...protection.plugins, ApolloServerPluginDrainHttpServer({ httpServer })],
    includeStacktraceInErrorResponses: !config.isProduction,
    formatError: (formattedError) => {
      if (config.isProduction && formattedError.extensions?.code === "INTERNAL_SERVER_ERROR") {
        return { ...formattedError, message: "Internal server error" };
      }
      return formattedError;
    },
  });
};
