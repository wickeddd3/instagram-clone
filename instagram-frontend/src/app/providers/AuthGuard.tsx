import { useAuth } from "./AuthContext";
import { MainLogin } from "@/components/auth/MainLogin";
import { MainLayout } from "./../layouts";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";

export const AuthGuard = () => {
  const { session, authUser, authUserLoading } = useAuth();

  if (authUserLoading) {
    return <LoadingScreen />;
  }

  if (!session || !authUser?.getProfileById) {
    return <MainLogin />;
  }

  return <MainLayout />;
};
