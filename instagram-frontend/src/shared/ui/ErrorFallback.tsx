import { AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onReload?: () => void;
}

// Shared full-bleed error screen, styled to match LoadingScreen's dark backdrop.
// Rendered by both the top-level ErrorBoundary (render crashes) and the router's
// RouteErrorBoundary (loader / lazy-chunk failures) so no failure state is bespoke.
export const ErrorFallback = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try reloading the page.",
  onReload = () => window.location.reload(),
}: ErrorFallbackProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <AlertTriangle
        className="text-muted"
        size={48}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="max-w-sm text-sm text-muted">{message}</p>
      </div>
      <button
        onClick={onReload}
        className="mt-2 rounded-lg bg-foreground px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        Reload page
      </button>
    </div>
  );
};
