import { lazy } from "react";

// Code-split entry point: consumers import this from the widget barrel so the
// sidebar implementation stays in its own chunk.
export const LazySuggestionsSidebar = lazy(() =>
  import("./SuggestionsSidebar").then((m) => ({
    default: m.SuggestionsSidebar,
  })),
);
