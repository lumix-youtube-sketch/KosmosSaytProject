import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageSectionProps {
  src: string;
  alt: string;
  text?: string;
  height?: string;
}

const ParallaxImageSection = ({ src, alt, text, height = "h-[80vh]" }: ParallaxImageSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // Fade image in/out as it enters and leaves viewport
  const imgOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className={`relative ${height} overflow-hidden`}>
      <motion.div
        className="absolute inset-0 w-full h-[115%]"
        style={{ y, scale, opacity: imgOpacity }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Layered overlays for ultra-smooth blending */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(2,8,23,0.5)_100%)]" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-background via-background/15 to-background" />
      {/* Extra thick top/bottom fades */}
      <div className="absolute top-0 left-0 right-0 h-40 z-20 pointer-events-none bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none bg-gradient-to-t from-background to-transparent" />

      {text && (
        <motion.h2
          className="absolute inset-0 z-30 flex items-center justify-center font-heading text-[clamp(2rem,8vw,8rem)] text-foreground/90 mix-blend-overlay text-center px-4"
          style={{ y: textY }}
        >
          {text}
        </motion.h2>
      )}
    </section>
  );
};

export default ParallaxImageSection;