import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";

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
