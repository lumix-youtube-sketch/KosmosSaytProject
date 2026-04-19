import { motion } from "framer-motion";

interface PageHeroProps {
  badge: string;
  line1: string;
  line2: string;
}

const PageHero = ({ badge, line1, line2 }: PageHeroProps) => (
  <section className="relative min-h-[70vh] sm:min-h-[60vh] flex items-end pb-8 sm:pb-[5vw] px-4 sm:px-[5vw] pt-20 sm:pt-0">
    <div className="relative z-10 w-full">
      <motion.div
        className="font-display text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse-glow flex-shrink-0" />
        {badge}
      </motion.div>
      <motion.h1
        className="font-heading text-[clamp(2.5rem,12vw,8rem)] leading-[0.88] uppercase"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <span className="block">{line1}</span>
        <span className="block text-stroke">{line2}</span>
      </motion.h1>
    </div>
  </section>
);

export default PageHero;
