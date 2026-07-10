export interface StoryParent {
  _count?: { views?: number };
}

export const StoryResolvers = {
  viewsCount: (parent: StoryParent) => parent._count?.views ?? 0,
};
