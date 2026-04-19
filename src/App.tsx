import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { GalaxyMapProvider, useGalaxyMap } from "@/contexts/GalaxyMapContext";
import GalaxyMap from "@/components/GalaxyMap";
import Index from "./pages/Index.tsx";
import Astronauts from "./pages/Astronauts.tsx";
import Planets from "./pages/Planets.tsx";
import Technology from "./pages/Technology.tsx";
import Sources from "./pages/Sources.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const { open } = useGalaxyMap();

  useEffect(() => {
    const handler = () => open();
    document.addEventListener("open-galaxy-map", handler);
    return () => document.removeEventListener("open-galaxy-map", handler);
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/astronauts" element={<Astronauts />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <GalaxyMapProvider>
          <AnimatedRoutes />
          <GalaxyMap />
        </GalaxyMapProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
