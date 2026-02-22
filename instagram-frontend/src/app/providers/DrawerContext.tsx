import { createContext, useContext, useState, type ReactNode } from "react";

interface DrawerContextType {
  isDrawerOpen: boolean;
  drawerContent: ReactNode;
  hasDrawerCloseButton: boolean;
  openDrawer: ({
    content,
    hasCloseButton,
  }: {
    content: ReactNode;
    hasCloseButton?: boolean;
  }) => void;
  closeDrawer: () => void;
}

export const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasDrawerCloseButton, setHasDrawerCloseButton] = useState(false);
  const [drawerContent, setDrawerContent] = useState<ReactNode | null>(null);

  const openDrawer = ({
    content,
    hasCloseButton = false,
  }: {
    content: ReactNode;
    hasCloseButton?: boolean;
  }) => {
    setDrawerContent(content);
    setHasDrawerCloseButton(hasCloseButton);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerContent(null);
    setHasDrawerCloseButton(false);
    setIsDrawerOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerContent,
        hasDrawerCloseButton,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
