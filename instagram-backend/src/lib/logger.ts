import pino from "pino";
import { config } from "@/config/env.config";

// Structured logger. In production it emits JSON so the hosting platform can
// parse it. In development it pretty-prints one concise line per event: the
// request logger (see logging.middleware) already folds method/route/status/
// timing into the message, so the verbose `req`/`res`/`responseTime` objects and
// the process `pid`/`hostname` are hidden here to keep the stream scannable.
// They still exist on the underlying record — only the pretty view drops them.
export const logger = pino({
  level: config.logLevel,
  ...(config.isProduction
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:HH:MM:ss.l",
            ignore: "pid,hostname,req,res,responseTime",
          },
        },
      }),
});
