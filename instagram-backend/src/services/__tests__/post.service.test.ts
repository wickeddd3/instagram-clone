import { describe, it, expect, vi } from "vitest";
import { PostService } from "@/services/post.service";

// Unit tests for the feed's followed-then-suggested injection logic. The service
// is pure orchestration over an injected Prisma client, so we drive each branch
// with a mock and no database. The tricky bits under test:
//   - a new/empty user falling straight through to suggestions
//   - a partially-filled page being topped up with suggestions
//   - cursor pagination detecting "suggested mode" and skipping the followed fetch
//   - the per-viewer isFollowing flag derived from the scoped followers rows

const VIEWER = "viewer-id";

interface FakePostOpts {
  followers?: { followerId: string }[];
}

// Shape mirrors what buildPostInclude loads: author (+scoped followers), and the
// viewer-scoped likes/savedBy the field resolvers read.
const makePost = (id: string, authorId: string, { followers = [] }: FakePostOpts = {}) => ({
  id,
  authorId,
  author: { id: authorId, followers },
  media: [],
  likes: [],
  savedBy: [],
  _count: { comments: 0, likes: 0 },
});

// Builds a Prisma mock whose post.findMany returns each provided batch in order
// (call 1 = followed fetch, call 2 = suggested fetch, when both happen).
const buildPrisma = (opts: {
  followingIds?: string[];
  cursorAuthorId?: string | null;
  findManyBatches: unknown[][];
}) => {
  const findMany = vi.fn();
  opts.findManyBatches.forEach((batch) => findMany.mockResolvedValueOnce(batch));

  return {
    follow: {
      findMany: vi.fn().mockResolvedValue((opts.followingIds ?? []).map((id) => ({ followingId: id }))),
    },
    post: {
      findMany,
      findUnique:
        opts.cursorAuthorId === undefined
          ? vi.fn()
          : vi.fn().mockResolvedValue(opts.cursorAuthorId === null ? null : { authorId: opts.cursorAuthorId }),
    },
  };
};

describe("PostService.getFeedPosts", () => {
  it("falls through to suggestions when a new user has no followed/own posts", async () => {
    const prisma = buildPrisma({
      followingIds: [],
      findManyBatches: [
        [], // followed/own posts: none
        [makePost("s1", "stranger-1"), makePost("s2", "stranger-2")], // suggestions
      ],
    });
    const service = new PostService(prisma as never);

    const result = await service.getFeedPosts(VIEWER, undefined, 5);

    expect(result.posts.map((p) => p.id)).toEqual(["s1", "s2"]);
    expect(result.hasMore).toBe(false); // 2 < limit 5
    expect(result.nextCursor).toBe(null);
    // Both the followed and the suggested query ran.
    expect(prisma.post.findMany).toHaveBeenCalledTimes(2);
    // Suggestions exclude the viewer and are not cursor-paginated on the first page.
    const suggestedArgs = prisma.post.findMany.mock.calls[1]?.[0];
    expect(suggestedArgs?.where.authorId.notIn).toContain(VIEWER);
    expect(suggestedArgs?.cursor).toBeUndefined();
  });

  it("does not fetch suggestions when followed posts fill the page", async () => {
    const followed = Array.from({ length: 5 }, (_, i) => makePost(`f${i}`, "friend"));
    const prisma = buildPrisma({
      followingIds: ["friend"],
      findManyBatches: [followed],
    });
    const service = new PostService(prisma as never);

    const result = await service.getFeedPosts(VIEWER, undefined, 5);

    expect(result.posts).toHaveLength(5);
    expect(result.hasMore).toBe(true);
    expect(result.nextCursor).toBe("f4");
    expect(prisma.post.findMany).toHaveBeenCalledTimes(1); // no suggestion fetch
  });

  it("tops up a partial page of followed posts with suggestions", async () => {
    const prisma = buildPrisma({
      followingIds: ["friend"],
      findManyBatches: [
        [makePost("f0", "friend"), makePost("f1", "friend")], // 2 followed
        [makePost("s0", "stranger"), makePost("s1", "stranger"), makePost("s2", "stranger")], // 3 suggested
      ],
    });
    const service = new PostService(prisma as never);

    const result = await service.getFeedPosts(VIEWER, undefined, 5);

    expect(result.posts.map((p) => p.id)).toEqual(["f0", "f1", "s0", "s1", "s2"]);
    expect(result.hasMore).toBe(true);
    expect(result.nextCursor).toBe("s2");
    // Suggestions only ask for the remaining space.
    expect(prisma.post.findMany.mock.calls[1]?.[0].take).toBe(3);
  });

  it("skips the followed fetch when paginating a cursor from suggested mode", async () => {
    const prisma = buildPrisma({
      followingIds: ["friend"],
      cursorAuthorId: "stranger", // cursor post's author is NOT followed
      findManyBatches: [[makePost("s3", "stranger"), makePost("s4", "stranger")]],
    });
    const service = new PostService(prisma as never);

    const result = await service.getFeedPosts(VIEWER, "cursor-id", 5);

    expect(result.posts.map((p) => p.id)).toEqual(["s3", "s4"]);
    // Only the suggested query ran; the followed fetch was skipped entirely.
    expect(prisma.post.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: "cursor-id" },
      select: { authorId: true },
    });
    // Suggested query resumes from the cursor.
    expect(prisma.post.findMany.mock.calls[0]?.[0].cursor).toEqual({ id: "cursor-id" });
  });

  it("derives isFollowing from the viewer's scoped followers rows and self-authorship", async () => {
    const prisma = buildPrisma({
      followingIds: ["friend"],
      findManyBatches: [
        [
          makePost("f0", "friend", { followers: [{ followerId: VIEWER }] }), // viewer follows author
          makePost("own", VIEWER), // viewer's own post
        ],
        [makePost("s0", "stranger", { followers: [] })], // not followed
      ],
    });
    const service = new PostService(prisma as never);

    const result = await service.getFeedPosts(VIEWER, undefined, 5);

    const byId = Object.fromEntries(result.posts.map((p) => [p.id, p.isFollowing]));
    expect(byId).toEqual({ f0: true, own: true, s0: false });
  });
});

describe("PostService.getExplorePosts", () => {
  it("excludes followed authors and the viewer, and reports pagination", async () => {
    const page = Array.from({ length: 9 }, (_, i) => makePost(`e${i}`, "stranger"));
    const prisma = {
      follow: { findMany: vi.fn().mockResolvedValue([{ followingId: "friend" }]) },
      post: { findMany: vi.fn().mockResolvedValue(page) },
    };
    const service = new PostService(prisma as never);

    const result = await service.getExplorePosts(VIEWER, undefined, 9);

    expect(result.hasMore).toBe(true); // full page
    expect(result.nextCursor).toBe("e8");
    expect(prisma.post.findMany.mock.calls[0]?.[0].where.authorId.notIn).toEqual(
      expect.arrayContaining(["friend", VIEWER]),
    );
  });

  it("reports no more pages when a partial page comes back", async () => {
    const prisma = {
      follow: { findMany: vi.fn().mockResolvedValue([]) },
      post: { findMany: vi.fn().mockResolvedValue([makePost("e0", "stranger")]) },
    };
    const service = new PostService(prisma as never);

    const result = await service.getExplorePosts(VIEWER, undefined, 9);

    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBe(null);
  });
});

describe("PostService.getSavedPosts", () => {
  it("returns the unwrapped posts with viewer state and pagination", async () => {
    const records = [
      { id: "sp1", post: makePost("p1", "author-a", { followers: [{ followerId: VIEWER }] }) },
      { id: "sp2", post: makePost("p2", "author-b") },
    ];
    const prisma = { savedPost: { findMany: vi.fn().mockResolvedValue(records) } };
    const service = new PostService(prisma as never);

    const result = await service.getSavedPosts(VIEWER, undefined, 2);

    expect(result.posts.map((p) => p.id)).toEqual(["p1", "p2"]);
    expect(result.posts[0]?.isFollowing).toBe(true);
    expect(result.posts[1]?.isFollowing).toBe(false);
    expect(result.hasMore).toBe(true); // 2 === limit
    expect(result.nextCursor).toBe("sp2"); // cursor is the SavedPost id, not the post id
    // Scoped to the viewer's own saved rows.
    expect(prisma.savedPost.findMany.mock.calls[0]?.[0].where).toEqual({ userId: VIEWER });
  });
});

describe("PostService.toggleLike", () => {
  it("creates a like when none exists and returns the fresh count", async () => {
    const prisma = {
      like: {
        findUnique: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: "l1" }),
        delete: vi.fn(),
      },
      post: { findUnique: vi.fn().mockResolvedValue({ _count: { likes: 3 } }) },
    };
    const service = new PostService(prisma as never);

    const result = await service.toggleLike(VIEWER, "post-1");

    expect(prisma.like.create).toHaveBeenCalledWith({ data: { userId: VIEWER, postId: "post-1" } });
    expect(prisma.like.delete).not.toHaveBeenCalled();
    expect(result).toEqual({ id: "post-1", isLiked: true, likesCount: 3 });
  });

  it("removes an existing like", async () => {
    const prisma = {
      like: {
        findUnique: vi.fn().mockResolvedValue({ id: "l1" }),
        create: vi.fn(),
        delete: vi.fn().mockResolvedValue({ id: "l1" }),
      },
      post: { findUnique: vi.fn().mockResolvedValue({ _count: { likes: 2 } }) },
    };
    const service = new PostService(prisma as never);

    const result = await service.toggleLike(VIEWER, "post-1");

    expect(prisma.like.delete).toHaveBeenCalledWith({ where: { id: "l1" } });
    expect(prisma.like.create).not.toHaveBeenCalled();
    expect(result).toEqual({ id: "post-1", isLiked: false, likesCount: 2 });
  });
});

describe("PostService.toggleSave", () => {
  it("saves when not yet saved and unsaves otherwise", async () => {
    const makePrisma = (existing: { id: string } | null) => ({
      savedPost: {
        findUnique: vi.fn().mockResolvedValue(existing),
        create: vi.fn(),
        delete: vi.fn(),
      },
    });

    const savingPrisma = makePrisma(null);
    const saved = await new PostService(savingPrisma as never).toggleSave(VIEWER, "post-1");
    expect(savingPrisma.savedPost.create).toHaveBeenCalledWith({ data: { userId: VIEWER, postId: "post-1" } });
    expect(saved).toEqual({ id: "post-1", isSaved: true });

    const unsavingPrisma = makePrisma({ id: "s1" });
    const unsaved = await new PostService(unsavingPrisma as never).toggleSave(VIEWER, "post-1");
    expect(unsavingPrisma.savedPost.delete).toHaveBeenCalledWith({ where: { id: "s1" } });
    expect(unsaved).toEqual({ id: "post-1", isSaved: false });
  });
});
