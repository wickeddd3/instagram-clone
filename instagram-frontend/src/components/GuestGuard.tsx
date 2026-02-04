import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "./loaders/LoadingScreen";

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
