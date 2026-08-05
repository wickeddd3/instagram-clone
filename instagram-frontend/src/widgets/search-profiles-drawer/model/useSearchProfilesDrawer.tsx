import { useDrawerActions } from "@/shared/lib";
import { SearchProfilesDrawer } from "../ui/SearchProfilesDrawer";

export const useSearchProfilesDrawer = () => {
  const { openDrawer } = useDrawerActions();

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
