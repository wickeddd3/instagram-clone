import { useAuth } from "../contexts/AuthContext";
import { MainLogin } from "./auth/MainLogin";
import { Layout } from "./layouts/Layout";
import { LoadingScreen } from "./loaders/LoadingScreen";

export const AuthGuard = () => {
  const { session, authUserLoading } = useAuth();

  if (authUserLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <MainLogin />;
  }

  return <Layout />;
};
