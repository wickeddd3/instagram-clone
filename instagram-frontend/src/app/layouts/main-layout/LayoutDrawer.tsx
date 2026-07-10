import {
  useDrawerActions,
  useDrawerState,
} from "@/shared/lib/drawer";
import { Drawer } from "@/shared/ui/Drawer";
import { memo } from "react";

export const LayoutDrawer = memo(() => {
  const { isDrawerOpen, drawerContent, hasDrawerCloseButton } =
    useDrawerState();
  const { closeDrawer } = useDrawerActions();

  return (
    isDrawerOpen && (
      <Drawer
        content={drawerContent}
        hasCloseButton={hasDrawerCloseButton}
        onClose={closeDrawer}
      />
    )
  );
});

LayoutDrawer.displayName = "LayoutDrawer";
