import { useDrawer } from "@/app/providers/DrawerContext";
import { NotificationsDrawer } from "../ui/NotificationsDrawer";

export const useNotificationsDrawer = () => {
  const { openDrawer } = useDrawer();

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
