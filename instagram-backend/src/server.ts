import http from "http";
import { config } from "./config/env.config";
import { logger } from "./lib/logger";
import { prisma } from "./lib/prisma";
import { createApolloServer } from "./graphql/server";
import { createApp } from "./http/app";

const SHUTDOWN_TIMEOUT_MS = 10_000;

/**
 * Boots the HTTP server, Apollo, and the Express app, then installs graceful
 * shutdown handlers. The HTTP server is created first (with no handler) so the
 * Apollo drain plugin can bind to it before the Express app is attached.
 */
export const start = async (): Promise<http.Server> => {
  const httpServer = http.createServer();

  const apollo = createApolloServer(httpServer);
  await apollo.start();

  const app = createApp(apollo);
  httpServer.on("request", app);

  await new Promise<void>((resolve) => {
    httpServer.listen(config.port, resolve);
  });
  logger.info(`🚀 Server ready at http://localhost:${String(config.port)}/graphql`);

  let shuttingDown = false;
  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, "Shutting down");

    // Safety net: force-exit if graceful shutdown stalls.
    const forceTimer = setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      // eslint-disable-next-line n/no-process-exit -- last resort when drain stalls
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    forceTimer.unref();

    try {
      await apollo.stop(); // drains the HTTP server via the drain plugin
      await prisma.$disconnect();
      logger.info("Shutdown complete");
      // eslint-disable-next-line n/no-process-exit -- intentional clean exit after cleanup
      process.exit(0);
    } catch (err) {
      logger.error({ err }, "Error during shutdown");
      // eslint-disable-next-line n/no-process-exit -- exit non-zero on failed shutdown
      process.exit(1);
    }
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));

  return httpServer;
};
