import { describe, it, expect } from "vitest";
import { GraphQLError } from "graphql";
import { z } from "zod";
import { validateInput } from "@/graphql/validation";
import { createPostSchema } from "@/graphql/modules/post/schema";
import { addCommentSchema } from "@/graphql/modules/comment/schema";
import { createStorySchema } from "@/graphql/modules/story/schema";
import { createProfileSchema, updateProfileSchema, avatarSchema } from "@/graphql/modules/profile/schema";

const VALID_URL = "https://cdn.example.com/storage/posts/a.jpg";

describe("validateInput", () => {
  it("returns cleaned data (trims, applies defaults, strips unknown keys)", () => {
    const result = validateInput(createPostSchema, {
      media: [{ url: VALID_URL, type: "IMAGE" }],
      extra: "should be dropped",
    });

    expect(result).toEqual({
      media: [{ url: VALID_URL, type: "IMAGE" }],
      caption: "",
      location: "",
    });
    expect(result).not.toHaveProperty("extra");
  });

  it("throws a BAD_USER_INPUT GraphQLError listing the offending fields", () => {
    let thrown: unknown;
    try {
      validateInput(createProfileSchema, { id: "not-a-uuid", username: "a", email: "nope", displayName: "" });
    } catch (err) {
      thrown = err;
    }

    expect(thrown).toBeInstanceOf(GraphQLError);
    const error = thrown as GraphQLError;
    expect(error.extensions.code).toBe("BAD_USER_INPUT");
    const details = error.extensions.details as { field: string }[];
    expect(details.map((d) => d.field).sort()).toEqual(["displayName", "email", "id", "username"]);
  });

  it("re-throws non-zod errors untouched", () => {
    const boom = new Error("boom");
    const throwing = z.string().transform(() => {
      throw boom;
    });

    expect(() => validateInput(throwing, "x")).toThrow(boom);
  });
});

describe("createPostSchema", () => {
  it("accepts a valid post with caption and location", () => {
    const input = {
      media: [{ url: VALID_URL, type: "VIDEO" }],
      caption: "hello",
      location: "Manila",
    };
    expect(createPostSchema.parse(input)).toEqual(input);
  });

  it.each([
    ["empty media", { media: [], caption: "x" }],
    ["too many media items", { media: Array.from({ length: 11 }, () => ({ url: VALID_URL, type: "IMAGE" })) }],
    ["invalid media url", { media: [{ url: "not-a-url", type: "IMAGE" }] }],
    ["invalid media type", { media: [{ url: VALID_URL, type: "GIF" }] }],
    ["caption too long", { media: [{ url: VALID_URL, type: "IMAGE" }], caption: "a".repeat(2201) }],
    ["location too long", { media: [{ url: VALID_URL, type: "IMAGE" }], location: "a".repeat(101) }],
  ])("rejects %s", (_label, input) => {
    expect(createPostSchema.safeParse(input).success).toBe(false);
  });
});

describe("addCommentSchema", () => {
  it("trims the comment text", () => {
    const result = addCommentSchema.parse({ postId: "p1", text: "  hi  " });
    expect(result.text).toBe("hi");
  });

  it.each([
    ["whitespace-only text", { postId: "p1", text: "   " }],
    ["empty text", { postId: "p1", text: "" }],
    ["missing postId", { text: "hi" }],
    ["text too long", { postId: "p1", text: "a".repeat(2201) }],
  ])("rejects %s", (_label, input) => {
    expect(addCommentSchema.safeParse(input).success).toBe(false);
  });
});

describe("updateProfileSchema", () => {
  it("accepts a partial update", () => {
    expect(updateProfileSchema.parse({ bio: "just the bio" })).toEqual({ bio: "just the bio" });
  });

  it.each([
    ["displayName too long", { displayName: "a".repeat(61) }],
    ["bio too long", { bio: "a".repeat(151) }],
    ["website too long", { website: "a".repeat(201) }],
  ])("rejects %s", (_label, input) => {
    expect(updateProfileSchema.safeParse(input).success).toBe(false);
  });
});

describe("createProfileSchema", () => {
  const valid = {
    id: "3f6c1b7e-6b2a-4c1a-9c2e-2b0d1f8a7c11",
    username: "valid.user_1",
    email: "user@example.com",
    displayName: "Valid User",
  };

  it("accepts a valid profile", () => {
    expect(createProfileSchema.parse(valid)).toEqual(valid);
  });

  it.each([
    ["non-uuid id", { ...valid, id: "abc" }],
    ["short username", { ...valid, username: "ab" }],
    ["illegal username chars", { ...valid, username: "bad name!" }],
    ["invalid email", { ...valid, email: "nope" }],
    ["empty displayName", { ...valid, displayName: "  " }],
  ])("rejects %s", (_label, input) => {
    expect(createProfileSchema.safeParse(input).success).toBe(false);
  });
});

describe("createStorySchema & avatarSchema", () => {
  it("accepts valid story media", () => {
    expect(createStorySchema.parse({ mediaUrl: VALID_URL, mediaType: "IMAGE" })).toEqual({
      mediaUrl: VALID_URL,
      mediaType: "IMAGE",
    });
  });

  it("rejects a bad story url or type", () => {
    expect(createStorySchema.safeParse({ mediaUrl: "x", mediaType: "IMAGE" }).success).toBe(false);
    expect(createStorySchema.safeParse({ mediaUrl: VALID_URL, mediaType: "AUDIO" }).success).toBe(false);
  });

  it("rejects a non-url avatar", () => {
    expect(avatarSchema.safeParse({ avatarUrl: "not-a-url" }).success).toBe(false);
    expect(avatarSchema.safeParse({ avatarUrl: VALID_URL }).success).toBe(true);
  });
});
