import { createContext, useContext, type ReactNode } from "react";

export interface DrawerState {
  isDrawerOpen: boolean;
  drawerContent: ReactNode;
  hasDrawerCloseButton: boolean;
}

export interface DrawerActions {
  openDrawer: (params: {
    content: ReactNode;
    hasCloseButton?: boolean;
  }) => void;
  closeDrawer: () => void;
}

export const DrawerStateContext = createContext<DrawerState | undefined>(
  undefined,
);
export const DrawerActionsContext = createContext<DrawerActions | undefined>(
  undefined,
);

export const useDrawerState = () => {
  const context = useContext(DrawerStateContext);
  if (!context)
    throw new Error("useDrawerState must be used within DrawerProvider");
  return context;
};

export const useDrawerActions = () => {
  const context = useContext(DrawerActionsContext);
  if (!context)
    throw new Error("useDrawerActions must be used within DrawerProvider");
  return context;
};
