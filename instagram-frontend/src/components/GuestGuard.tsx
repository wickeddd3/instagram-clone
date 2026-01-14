import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "./loaders/LoadingScreen";

export const GuestGuard = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
