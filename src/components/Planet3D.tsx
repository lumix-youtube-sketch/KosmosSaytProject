import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Planet3DProps {
  color?: string;
  speed?: number;
  distort?: number;
  size?: number;
  className?: string;
}

const Planet3D = ({
  color = "#00e5ff",
  speed = 0.3,
  distort = 0.3,
  size = 1.8,
  className = "w-full h-[500px]",
}: Planet3DProps) => {
  const orbitDuration = Math.max(8, 24 - speed * 20);
  const pulseDuration = Math.max(4, 10 - distort * 6);
  const planetSize = `${Math.max(180, Math.min(460, size * 180))}px`;

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(0,229,255,0.15),transparent_45%)]" />

      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ width: planetSize, height: planetSize }}
        initial={{ x: "-50%", y: "-50%", rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="relative h-full w-full rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${color} 35%, rgba(6, 16, 40, 0.95) 100%)`,
            boxShadow: `0 0 40px ${color}66, 0 0 120px ${color}33`,
          }}
          animate={{ scale: [1, 1.03 + distort * 0.05, 1], filter: ["saturate(1)", "saturate(1.25)", "saturate(1)"] }}
          transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-[12%] rounded-full border border-white/20" />
          <div className="absolute inset-[20%] rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/20 to-transparent" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[65%] w-[65%] rounded-full border border-white/20"
        initial={{ x: "-50%", y: "-50%", rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: orbitDuration * 1.2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] rounded-full border border-white/10"
        initial={{ x: "-50%", y: "-50%", rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: orbitDuration * 1.6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Planet3D;
