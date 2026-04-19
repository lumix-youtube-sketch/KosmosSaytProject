import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2, label }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-heading text-[clamp(2rem,5vw,4rem)] gradient-text-primary leading-none">
        {prefix}{value}{suffix}
      </div>
      <div className="font-display text-[10px] sm:text-[0.65rem] tracking-[0.15em] sm:tracking-[0.25em] uppercase text-muted-foreground mt-2 leading-tight">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
