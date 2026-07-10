import { start } from "./server";
import { logger } from "@/lib/logger";

start().catch((err: unknown) => {
  logger.error({ err }, "Failed to start server");
  // eslint-disable-next-line n/no-process-exit -- cannot serve without a running server
  process.exit(1);
});
