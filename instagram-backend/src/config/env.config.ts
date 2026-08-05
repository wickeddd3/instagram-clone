import "dotenv/config";
import { cleanEnv, str, port, num, makeValidator } from "envalid";

// This module is the single place environment variables are accessed;
// everything else imports `config`. `dotenv/config` loads .env into
// process.env, then envalid validates, coerces, and exits with a readable
// report if anything is missing/invalid.

const LOG_LEVELS = ["fatal", "error", "warn", "info", "debug", "trace", "silent"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

// envalid's str() accepts "" from a defined-but-blank var, which would silently
// pass required secrets. This rejects blank values.
const nonEmptyStr = makeValidator<string>((value) => {
  if (value.trim() === "") {
    throw new Error("Expected a non-empty string");
  }
  return value;
});

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production", "test"], default: "development" }),
  PORT: port({ default: 4000 }),

  DATABASE_URL: nonEmptyStr(),
  // Connection pool bounds (adapter-pg / node-postgres). Keep DATABASE_POOL_MAX
  // at/under the managed database's connection limit, accounting for instances.
  DATABASE_POOL_MAX: num({ default: 10 }),
  DATABASE_CONNECTION_TIMEOUT_MS: num({ default: 10_000 }),

  SUPABASE_URL: nonEmptyStr(),
  SUPABASE_SERVICE_ROLE_KEY: nonEmptyStr(),
  // Anon (public) key — used server-side to run the public signup flow so
  // Supabase sends its built-in email-verification link. The service-role key
  // would bypass confirmation, so signup uses the anon key on purpose.
  SUPABASE_ANON_KEY: nonEmptyStr(),

  // Frontend origin(s), comma-separated. Used to build the CORS allowlist.
  APP_URL: str({ default: "http://localhost:5173" }),

  LOG_LEVEL: str<LogLevel>({ choices: [...LOG_LEVELS], default: "info" }),

  // Rate limiting (sensible defaults; override per environment).
  RATE_LIMIT_WINDOW_MS: num({ default: 60_000 }),
  RATE_LIMIT_MAX: num({ default: 100 }),
});

const corsOrigins = env.APP_URL.split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Primary frontend origin (first of APP_URL). Used for links back into the app,
// e.g. the email-verification redirect target.
const appUrl = corsOrigins[0] ?? "http://localhost:5173";

export const config = {
  nodeEnv: env.NODE_ENV,
  isProduction: env.isProduction,
  isTest: env.isTest,
  port: env.PORT,
  database: {
    url: env.DATABASE_URL,
    poolMax: env.DATABASE_POOL_MAX,
    connectionTimeoutMs: env.DATABASE_CONNECTION_TIMEOUT_MS,
  },
  supabase: {
    url: env.SUPABASE_URL,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
    anonKey: env.SUPABASE_ANON_KEY,
  },
  logLevel: env.LOG_LEVEL,
  corsOrigins,
  appUrl,
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
  },
} as const;

export type Config = typeof config;
