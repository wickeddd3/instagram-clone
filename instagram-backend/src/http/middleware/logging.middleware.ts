import type { IncomingMessage, ServerResponse } from "http";
import { pinoHttp } from "pino-http";
import { logger } from "@/lib/logger";

// Health probes poll continuously; logging them buries real traffic.
const IGNORED_PATHS = new Set(["/healthz", "/readyz"]);

/**
 * Build the human-facing summary for a request. Every GraphQL call is a
 * `POST /graphql`, so the operation name (parsed onto `req.body` by the time the
 * response finishes) is surfaced to keep those lines distinguishable.
 */
const describeRequest = (req: IncomingMessage): string => {
  const method = req.method ?? "?";
  // Express rewrites `req.url` to the mount-relative path (e.g. "/" inside the
  // /graphql handler); `originalUrl` preserves the path the client requested.
  const { originalUrl, body } = req as { originalUrl?: string; body?: { operationName?: unknown } };
  const url = originalUrl ?? req.url ?? "?";
  if (url.startsWith("/graphql") && typeof body?.operationName === "string") {
    return `${method} /graphql (${body.operationName})`;
  }
  return `${method} ${url}`;
};

/**
 * HTTP request logger. Emits a single concise line per completed request —
 * `POST /graphql (GetFeedPosts) → 200 · 9ms` — instead of pino-http's default
 * full req/res dump. Structured fields (req/res/responseTime) remain on the
 * record for production JSON; only their verbose pretty rendering is trimmed
 * (see logger). Status class drives the level so 4xx/5xx stand out.
 */
export const httpLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req: IncomingMessage) => IGNORED_PATHS.has(req.url ?? ""),
  },
  customLogLevel: (_req: IncomingMessage, res: ServerResponse, err?: Error) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  customSuccessMessage: (req: IncomingMessage, res: ServerResponse, responseTime: number) =>
    `${describeRequest(req)} → ${String(res.statusCode)} · ${String(Math.round(responseTime))}ms`,
  customErrorMessage: (req: IncomingMessage, res: ServerResponse, err: Error) =>
    `${describeRequest(req)} → ${String(res.statusCode)} · ${err.message}`,
  // Keep the persisted req/res lean: the full header set is noise (and a small
  // leak risk) in JSON logs, and the message already carries the essentials.
  serializers: {
    req: (req: IncomingMessage & { id?: string | number }) => ({
      id: req.id,
      method: req.method,
      url: req.url,
    }),
    res: (res: ServerResponse) => ({ statusCode: res.statusCode }),
  },
});
