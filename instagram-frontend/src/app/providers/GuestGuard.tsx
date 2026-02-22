import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";

export const GuestGuard = () => {
  const { session, loading, authUser } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (session || authUser?.getProfileById) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
