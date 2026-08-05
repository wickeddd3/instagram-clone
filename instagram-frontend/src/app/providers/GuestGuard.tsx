import { useAuth } from "@/entities/profile";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "@/shared/ui";
import { useMinimumLoading } from "@/shared/lib";

export const GuestGuard = () => {
  const { session, authUserLoading, authProfile } = useAuth();
  const loading = useMinimumLoading(authUserLoading);

  if (loading) {
    return <LoadingScreen />;
  }

  if (session || authProfile) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
