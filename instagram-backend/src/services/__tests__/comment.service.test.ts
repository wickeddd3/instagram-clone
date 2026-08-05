import { describe, it, expect, vi } from "vitest";
import { CommentService } from "@/services/comment.service";

const makeComment = (id: string) => ({ id, text: `c-${id}`, author: {}, _count: { likes: 0, replies: 0 } });

describe("CommentService.getComments", () => {
  it("fetches the top-level thread and reports more pages on a full page", async () => {
    const page = Array.from({ length: 5 }, (_, i) => makeComment(`t${i}`));
    const prisma = { comment: { findMany: vi.fn().mockResolvedValue(page) } };
    const service = new CommentService(prisma as never);

    const result = await service.getComments({ postId: "post-1", limit: 5 });

    expect(result.hasMore).toBe(true);
    expect(result.nextCursor).toBe("t4");
    // Top-level comments only when no parentId is given.
    expect(prisma.comment.findMany.mock.calls[0]?.[0].where).toEqual({ postId: "post-1", parentId: null });
  });

  it("scopes to a reply thread and stops paginating on a partial page", async () => {
    const prisma = { comment: { findMany: vi.fn().mockResolvedValue([makeComment("r0")]) } };
    const service = new CommentService(prisma as never);

    const result = await service.getComments({ postId: "post-1", parentId: "c-1", limit: 5 });

    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBe(null);
    expect(prisma.comment.findMany.mock.calls[0]?.[0].where.parentId).toBe("c-1");
  });

  it("resumes from the cursor with skip: 1", async () => {
    const prisma = { comment: { findMany: vi.fn().mockResolvedValue([]) } };
    const service = new CommentService(prisma as never);

    await service.getComments({ postId: "post-1", cursor: "c-9", limit: 5 });

    const args = prisma.comment.findMany.mock.calls[0]?.[0];
    expect(args.cursor).toEqual({ id: "c-9" });
    expect(args.skip).toBe(1);
  });
});

describe("CommentService.addComment", () => {
  it("creates a top-level comment defaulting parentId to null", async () => {
    const created = { id: "new", text: "hi", author: {} };
    const prisma = { comment: { create: vi.fn().mockResolvedValue(created) } };
    const service = new CommentService(prisma as never);

    const result = await service.addComment("user-1", { postId: "post-1", text: "hi" });

    expect(result).toBe(created);
    expect(prisma.comment.create.mock.calls[0]?.[0].data).toEqual({
      text: "hi",
      postId: "post-1",
      authorId: "user-1",
      parentId: null,
    });
  });
});

describe("CommentService.toggleLike", () => {
  it("likes a comment when none exists and returns the fresh count", async () => {
    const prisma = {
      like: { findUnique: vi.fn().mockResolvedValue(null), create: vi.fn(), delete: vi.fn() },
      comment: { findUnique: vi.fn().mockResolvedValue({ _count: { likes: 1 } }) },
    };
    const service = new CommentService(prisma as never);

    const result = await service.toggleLike("user-1", "comment-1");

    expect(prisma.like.create).toHaveBeenCalledWith({ data: { userId: "user-1", commentId: "comment-1" } });
    expect(result).toEqual({ id: "comment-1", isLiked: true, likesCount: 1 });
  });

  it("removes an existing comment like", async () => {
    const prisma = {
      like: { findUnique: vi.fn().mockResolvedValue({ id: "l1" }), create: vi.fn(), delete: vi.fn() },
      comment: { findUnique: vi.fn().mockResolvedValue({ _count: { likes: 0 } }) },
    };
    const service = new CommentService(prisma as never);

    const result = await service.toggleLike("user-1", "comment-1");

    expect(prisma.like.delete).toHaveBeenCalledWith({ where: { id: "l1" } });
    expect(result).toEqual({ id: "comment-1", isLiked: false, likesCount: 0 });
  });
});
