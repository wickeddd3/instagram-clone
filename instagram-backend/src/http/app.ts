import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { pinoHttp } from "pino-http";
import { json } from "body-parser";
import { expressMiddleware } from "@as-integrations/express5";
import type { ApolloServer } from "@apollo/server";
import { config } from "@/config/env.config";
import { logger } from "@/lib/logger";
import { services } from "@/container";
import type { GraphQLContext } from "@/graphql/context";
import { getUserIdFromRequest } from "@/http/middleware/auth.middleware";
import { healthRouter } from "./health.route";
import { errorHandler, notFoundHandler } from "@/http/middleware/error.middleware";
import { createApiRouter } from "@/http/rest";

/**
 * Assembles the Express application: security + observability middleware, the
 * GraphQL endpoint, health checks, and (later) the REST router — all sharing the
 * same services container.
 */
export const createApp = (apollo: ApolloServer<GraphQLContext>): Express => {
  const app = express();

  app.disable("x-powered-by");
  // Trust the platform proxy (Render) so rate limiting sees real client IPs.
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(pinoHttp({ logger }));

  // Health checks are mounted before rate limiting so probes are never throttled.
  app.use(healthRouter);

  app.use(cors({ origin: config.corsOrigins, credentials: true }));
  app.use(
    rateLimit({
      windowMs: config.rateLimit.windowMs,
      limit: config.rateLimit.max,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    }),
  );

  app.use(
    "/graphql",
    json({ limit: "1mb" }),
    expressMiddleware(apollo, {
      context: async ({ req }): Promise<GraphQLContext> => ({
        userId: await getUserIdFromRequest(req),
        services,
      }),
    }),
  );

  // REST transport, sharing the same services container as GraphQL.
  app.use("/api/v1", createApiRouter(services));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
