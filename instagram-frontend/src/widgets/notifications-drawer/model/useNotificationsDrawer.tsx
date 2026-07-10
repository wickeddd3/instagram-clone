import { useDrawerActions } from "@/shared/lib/drawer";
import { NotificationsDrawer } from "../ui/NotificationsDrawer";

export const useNotificationsDrawer = () => {
  const { openDrawer } = useDrawerActions();

  const openNotificationsDrawer = () => {
    openDrawer({
      content: <NotificationsDrawer />,
      hasCloseButton: true,
    });
  };

  return {
    openNotificationsDrawer,
  };
};
