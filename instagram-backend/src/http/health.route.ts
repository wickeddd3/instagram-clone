import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";

export const healthRouter = Router();

// Liveness: the process is up. Cheap and dependency-free so orchestrators can
// restart a wedged process without being misled by a slow database.
healthRouter.get("/healthz", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Readiness: the process can serve traffic (database reachable).
healthRouter.get("/readyz", (_req: Request, res: Response) => {
  void (async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({ status: "ready" });
    } catch (err) {
      logger.warn({ err }, "Readiness check failed");
      res.status(503).json({ status: "unavailable" });
    }
  })();
});
