import { motion } from "framer-motion";
import { useRef, useState, ComponentType } from "react";

interface FactCardProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  number: string;
  title: string;
  body: string;
  tag?: string;
  href?: string;
}

const FactCard = ({ icon: Icon, number, title, body, tag, href }: FactCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
      className="glass-card rounded-2xl p-5 sm:p-8 flex flex-col gap-3 sm:gap-4 transition-all duration-300 hover:border-primary/30 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <Icon size={24} className="text-primary sm:w-8 sm:h-8" />
      <div className="font-display text-[10px] sm:text-xs tracking-[0.2em] text-primary uppercase">{number}</div>
      <h3 className="font-heading text-lg sm:text-xl">{title}</h3>
      <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed line-clamp-4 sm:line-clamp-none">{body}</p>
      {tag && (
        <span className="self-start mt-auto px-2.5 py-1 text-[10px] sm:text-xs tracking-wider uppercase rounded-full border border-border text-muted-foreground">
          {tag}
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:no-underline">{content}</a>;
  }

  return content;
};

export default FactCard;
