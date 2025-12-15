import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Layout } from "./layouts/Layout";

export const AuthGuard = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h1 className="text-xl">Checking authentication status...</h1>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <Layout />;
};
