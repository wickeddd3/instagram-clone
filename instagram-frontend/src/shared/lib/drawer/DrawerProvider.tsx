import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  DrawerActionsContext,
  DrawerStateContext,
  type DrawerState,
} from "./DrawerContext";

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DrawerState>({
    isDrawerOpen: false,
    drawerContent: null,
    hasDrawerCloseButton: false,
  });

  const openDrawer = useCallback(
    ({
      content,
      hasCloseButton = false,
    }: {
      content: ReactNode;
      hasCloseButton?: boolean;
    }) => {
      setState({
        isDrawerOpen: true,
        drawerContent: content,
        hasDrawerCloseButton: hasCloseButton,
      });
    },
    [],
  );

  const closeDrawer = useCallback(() => {
    setState({
      isDrawerOpen: false,
      drawerContent: null,
      hasDrawerCloseButton: false,
    });
  }, []);

  const actions = useMemo(
    () => ({ openDrawer, closeDrawer }),
    [openDrawer, closeDrawer],
  );

  return (
    <DrawerStateContext.Provider value={state}>
      <DrawerActionsContext.Provider value={actions}>
        {children}
      </DrawerActionsContext.Provider>
    </DrawerStateContext.Provider>
  );
};
