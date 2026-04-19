import { motion } from "framer-motion";
import { useGalaxyMap } from "@/contexts/GalaxyMapContext";

const SpaceFooter = () => {
  const { open } = useGalaxyMap();

  return (
    <footer className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08)_0%,transparent_60%)]" />
      <div className="relative z-10 text-center w-full px-[5vw]">
        <motion.h2
          className="font-heading text-[8vw] leading-[0.9] mb-[5vh]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          ГОТОВ К<br />ПОЛЕТУ?
        </motion.h2>
        <motion.button
          onClick={open}
          className="inline-block font-display text-[clamp(1rem,2vw,1.5rem)] border-b-2 border-primary pb-2 text-foreground hover:text-primary transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          ОТКРЫТЬ КАРТУ ГАЛАКТИКИ
        </motion.button>
      </div>
    </footer>
  );
};

export default SpaceFooter;
