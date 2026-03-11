export const StoryResolvers = {
  viewsCount: (parent: any) => parent._count?.views ?? 0,
};
