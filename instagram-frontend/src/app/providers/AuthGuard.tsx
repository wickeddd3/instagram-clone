import { useAuth } from "./AuthContext";
import { MainLayout } from "./../layouts";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";
import { MainLogin } from "@/widgets/auth";

export const AuthGuard = () => {
  const { session, authProfile, authProfileLoading } = useAuth();

  if (authProfileLoading) {
    return <LoadingScreen />;
  }

  if (!session || !authProfile) {
    return <MainLogin />;
  }

  return <MainLayout />;
};
