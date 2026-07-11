import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { ErrorFallback } from "@/shared/ui/ErrorFallback";

// errorElement for the data router. Catches loader/render errors and, most
// importantly, a failed dynamic import — after a redeploy the old chunk URLs
// 404, so a full reload fetches the fresh asset manifest instead of dead-ending.
export const RouteErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <ErrorFallback
        title="Page not found"
        message="The page you're looking for doesn't exist or has moved."
      />
    );
  }

  // eslint-disable-next-line no-console -- intentional error-reporting seam
  console.error("Route error:", error);

  return (
    <ErrorFallback message="We couldn't load this page. Reloading usually fixes it." />
  );
};
