import { useDrawerActions } from "@/shared/lib";
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
