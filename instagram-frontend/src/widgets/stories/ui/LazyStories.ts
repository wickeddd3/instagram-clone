import { lazy } from "react";

// Code-split entry point: consumers import this from the widget barrel so the
// heavy Stories implementation (Swiper etc.) stays in its own chunk.
export const LazyStories = lazy(() =>
  import("./Stories").then((m) => ({ default: m.Stories })),
);
