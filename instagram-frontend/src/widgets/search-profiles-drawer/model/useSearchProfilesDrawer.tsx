import { useDrawer } from "@/app/providers/DrawerContext";
import { SearchProfilesDrawer } from "../ui/SearchProfilesDrawer";

export const useSearchProfilesDrawer = () => {
  const { openDrawer } = useDrawer();

  const openSearchProfilesDrawer = () => {
    openDrawer({
      content: <SearchProfilesDrawer />,
      hasCloseButton: true,
    });
  };

  return {
    openSearchProfilesDrawer,
  };
};
