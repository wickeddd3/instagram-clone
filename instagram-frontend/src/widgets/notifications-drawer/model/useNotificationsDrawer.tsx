import { useDrawerActions } from "@/app/providers/DrawerContext";
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
