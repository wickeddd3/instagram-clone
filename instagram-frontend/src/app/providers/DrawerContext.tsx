import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface DrawerState {
  isDrawerOpen: boolean;
  drawerContent: ReactNode;
  hasDrawerCloseButton: boolean;
}

interface DrawerActions {
  openDrawer: (params: {
    content: ReactNode;
    hasCloseButton?: boolean;
  }) => void;
  closeDrawer: () => void;
}

const DrawerStateContext = createContext<DrawerState | undefined>(undefined);
const DrawerActionsContext = createContext<DrawerActions | undefined>(
  undefined,
);

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
