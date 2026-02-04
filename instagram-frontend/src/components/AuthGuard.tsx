import { useAuth } from "../contexts/AuthContext";
import { MainLogin } from "./auth/MainLogin";
import { Layout } from "./layouts/Layout";
import { LoadingScreen } from "./loaders/LoadingScreen";

export const AuthGuard = () => {
  const { session, authUser, authUserLoading } = useAuth();

  if (authUserLoading) {
    return <LoadingScreen />;
  }

  if (!session || !authUser?.getProfileById) {
    return <MainLogin />;
  }

  return <Layout />;
};
