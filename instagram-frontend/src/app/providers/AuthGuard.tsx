import { useAuth } from "@/entities/profile";
import { MainLayout } from "./../layouts";
import { LoadingScreen } from "@/shared/ui";
import { useMinimumLoading } from "@/shared/lib";
import { MainLogin } from "@/widgets/auth";

export const AuthGuard = () => {
  const { session, authUserLoading, authProfile, authProfileLoading } =
    useAuth();
  const loading = useMinimumLoading(authUserLoading || authProfileLoading);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!session || !authProfile) {
    return <MainLogin />;
  }

  return <MainLayout />;
};
