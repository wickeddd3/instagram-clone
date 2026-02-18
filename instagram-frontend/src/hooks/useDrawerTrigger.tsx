import { NotificationsDrawer } from "../components/layouts/NotificationsDrawer";
import { SearchDrawer } from "../components/layouts/SearchDrawer";
import { useDrawer } from "../contexts/DrawerContext";

export const useDrawerTrigger = () => {
  const { openDrawer } = useDrawer();

  const openSearchDrawer = () => {
    openDrawer({
      content: <SearchDrawer />,
      hasCloseButton: true,
    });
  };

  const openNotificationsDrawer = () => {
    openDrawer({
      content: <NotificationsDrawer />,
      hasCloseButton: true,
    });
  };

  return { openSearchDrawer, openNotificationsDrawer };
};
