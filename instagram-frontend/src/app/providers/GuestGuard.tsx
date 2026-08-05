import { useAuth } from "@/entities/profile";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "@/shared/ui";

export const GuestGuard = () => {
  const { session, authUserLoading, authProfile } = useAuth();

  if (authUserLoading) {
    return <LoadingScreen />;
  }

  if (session || authProfile) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
