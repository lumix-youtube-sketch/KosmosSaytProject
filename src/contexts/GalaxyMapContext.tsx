import { createContext, useContext, useState, ReactNode } from "react";

interface GalaxyMapContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const GalaxyMapContext = createContext<GalaxyMapContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const GalaxyMapProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);
  return (
    <GalaxyMapContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </GalaxyMapContext.Provider>
  );
};

export const useGalaxyMap = () => useContext(GalaxyMapContext);
