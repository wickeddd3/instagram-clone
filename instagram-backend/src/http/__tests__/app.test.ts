import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "http";
import request from "supertest";
import type { Express } from "express";
import type { ApolloServer } from "@apollo/server";
import { createApolloServer } from "@/graphql/server";
import { createApp } from "@/http/app";
import type { GraphQLContext } from "@/graphql/context";

// Integration test: assembles the real Express app (helmet, error handling,
// health) over a started Apollo server. Covers the dependency-free surface so it
// runs anywhere without a database or Supabase.
let app: Express;
let apollo: ApolloServer<GraphQLContext>;

beforeAll(async () => {
  const httpServer = http.createServer();
  apollo = createApolloServer(httpServer);
  await apollo.start();
  app = createApp(apollo);
});

afterAll(async () => {
  await apollo.stop();
});

describe("http app", () => {
  it("GET /healthz returns ok", async () => {
    const res = await request(app).get("/healthz");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("unknown routes return the 404 error envelope", async () => {
    const res = await request(app).get("/definitely-not-a-route");
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("does not leak x-powered-by", async () => {
    const res = await request(app).get("/healthz");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});
