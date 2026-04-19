import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="font-display text-[5vw] font-bold text-stroke tracking-wider">
            {count}%
          </div>
          <div className="mt-5 text-xs tracking-[0.5em] text-primary animate-pulse-glow uppercase">
            ИНИЦИАЛИЗАЦИЯ ДВИГАТЕЛЕЙ...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
