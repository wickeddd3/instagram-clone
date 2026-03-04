import { PrismaClient } from "@prisma/client/extension";

export class CommentService {
  constructor(private prisma: PrismaClient) {}

  async getComments(params: {
    postId: string;
    parentId?: string;
    cursor?: string;
    limit: number;
  }) {
    const { postId, parentId, cursor, limit } = params;

    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
        parentId: parentId || null, // Fetch top-level or specific child thread
      },
      take: limit,
      orderBy: { createdAt: "asc" }, // Comments usually scroll oldest to newest
      include: {
        author: true,
        _count: { select: { likes: true, replies: true } },
      },
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });

    const hasMore = comments.length === limit;
    const nextCursor = hasMore ? comments[comments.length - 1]?.id : null;

    return { comments, hasMore, nextCursor };
  }

  async addComment(
    userId: string,
    data: { postId: string; text: string; parentId?: string },
  ) {
    return await this.prisma.comment.create({
      data: {
        text: data.text,
        postId: data.postId,
        authorId: userId,
        parentId: data.parentId || null,
      },
      include: { author: true },
    });
  }

  async toggleLike(userId: string, commentId: string) {
    const existing = await this.prisma.like.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });

    if (existing) {
      await this.prisma.like.delete({ where: { id: existing.id } });
    } else {
      await this.prisma.like.create({ data: { userId, commentId } });
    }

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { _count: { select: { likes: true } } },
    });

    return {
      id: commentId,
      isLiked: !existing,
      likesCount: comment?._count.likes || 0,
    };
  }
}
