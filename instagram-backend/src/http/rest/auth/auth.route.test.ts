import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import type { Express } from "express";
import request from "supertest";
import { createAuthRouter } from "./index";
import { errorHandler, notFoundHandler } from "../../middleware/error.middleware";
import type { Services } from "../../../container";

// Mounts the real auth router over a stubbed account service, so the tests
// exercise routing, body validation, and the response envelope without hitting
// Supabase or the database.
const fakeResult = {
  profile: { id: "u1", username: "ada", email: "ada@example.com", displayName: "Ada" },
  session: { access_token: "a", refresh_token: "r", expires_at: 1, expires_in: 3600, token_type: "bearer" },
};

const services = {
  account: {
    signup: async () => fakeResult,
  },
} as unknown as Services;

let app: Express;

beforeAll(() => {
  app = express();
  app.use("/auth", createAuthRouter(services));
  app.use(notFoundHandler);
  app.use(errorHandler);
});

describe("REST POST /auth/signup", () => {
  it("rejects an invalid body with a 400 envelope", async () => {
    const res = await request(app).post("/auth/signup").send({ email: "not-an-email", password: "123" });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("BAD_REQUEST");
  });

  it("creates the account and returns profile + session", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ email: "ada@example.com", password: "secret6", username: "ada", displayName: "Ada" });
    expect(res.status).toBe(201);
    expect(res.body.data.profile.username).toBe("ada");
    expect(res.body.data.session.access_token).toBe("a");
  });
});
