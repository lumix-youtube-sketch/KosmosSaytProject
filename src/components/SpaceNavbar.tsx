import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useGalaxyMap } from "@/contexts/GalaxyMapContext";

const links = [
  { to: "/", label: "Главная" },
  { to: "/astronauts", label: "Космонавты" },
  { to: "/planets", label: "Планеты" },
  { to: "/technology", label: "Технологии" },
  { to: "/sources", label: "Источники" },
];

const SpaceNavbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isOpen } = useGalaxyMap();
  const currentPage = links.find((link) => link.to === location.pathname)?.label ?? "Раздел";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full px-4 sm:px-[5vw] py-4 sm:py-5 flex justify-between items-center z-[1000] transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="flex flex-col min-w-0">
          <Link to="/" className="font-display font-bold text-base sm:text-lg tracking-widest text-foreground truncate">
            ✦ КОСМОС.
          </Link>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground/50 sm:text-foreground/70 hidden sm:block">образовательный гид по космосу</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/60">Сейчас: {currentPage}</span>
          <div className="flex gap-[2vw]">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-xs tracking-[0.1em] uppercase font-semibold text-foreground transition-opacity hover:opacity-100 ${
                  location.pathname === link.to ? "opacity-100" : "opacity-60"
                } group`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-500 ${
                    location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 z-[1001] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Открыть меню"
        >
          <motion.span className="w-6 h-px bg-foreground block" animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
          <motion.span className="w-6 h-px bg-foreground block" animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span className="w-6 h-px bg-foreground block" animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && !isOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 sm:gap-8 px-6"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-xs text-center text-sm text-muted-foreground">
              Сайт о людях, планетах и технологиях, которые космос дал Земле.
            </p>
            {links.map((link, i) => (
              <motion.div key={link.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`font-heading text-2xl sm:text-3xl uppercase tracking-wider ${
                    location.pathname === link.to ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpaceNavbar;
