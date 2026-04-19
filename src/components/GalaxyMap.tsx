import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGalaxyMap } from "@/contexts/GalaxyMapContext";
import { X, MousePointer2, Keyboard, Star } from "lucide-react";

interface StarSystem {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
  type: string;
  fact: string;
  distance: string;
}

const SYSTEMS: StarSystem[] = [
  { id: "sol", name: "Солнечная система", x: 0, y: 0, size: 9, color: "#FFD700", type: "Жёлтый карлик G2", fact: "Наш дом. 8 планет, 200+ лун.", distance: "0 св. лет" },
  { id: "proxima", name: "Проксима Центавра", x: 130, y: -65, size: 3, color: "#FF6B6B", type: "Красный карлик", fact: "Ближайшая звезда. Планета в зоне обитаемости.", distance: "4.24 св. лет" },
  { id: "sirius", name: "Сириус", x: -200, y: 45, size: 10, color: "#A8D8FF", type: "Белая звезда", fact: "Ярчайшая звезда ночного неба. В 25 раз ярче Солнца.", distance: "8.6 св. лет" },
  { id: "vega", name: "Вега", x: 90, y: 170, size: 6, color: "#E8F4FF", type: "Белая звезда", fact: "5-я по яркости. Вращается так быстро, что сплюснута.", distance: "25 св. лет" },
  { id: "betelgeuse", name: "Бетельгейзе", x: -260, y: -130, size: 12, color: "#FF4500", type: "Красный сверхгигант", fact: "Скоро взорвётся. Диаметр — 1400 Солнц.", distance: "700 св. лет" },
  { id: "rigel", name: "Ригель", x: 320, y: -210, size: 11, color: "#DDEEFF", type: "Голубой сверхгигант", fact: "В 120 000 раз ярче Солнца.", distance: "860 св. лет" },
  { id: "antares", name: "Антарес", x: -110, y: 300, size: 11, color: "#FF2200", type: "Красный сверхгигант", fact: "Мог бы поглотить орбиту Юпитера.", distance: "550 св. лет" },
  { id: "deneb", name: "Денеб", x: 200, y: 340, size: 9, color: "#F0F8FF", type: "Белый сверхгигант", fact: "Светимость — 200 000 Солнц.", distance: "2600 св. лет" },
  { id: "uy-scuti", name: "UY Щита", x: -400, y: 110, size: 14, color: "#CC3300", type: "Красный гипергигант", fact: "Диаметр в 1700 раз больше Солнца.", distance: "9500 св. лет" },
  { id: "sgr", name: "Sgr A*", x: 45, y: -420, size: 13, color: "#9933FF", type: "Чёрная дыра", fact: "В центре Млечного Пути. Масса — 4 млн солнц.", distance: "26 000 св. лет" },
  { id: "canopus", name: "Канопус", x: -65, y: -265, size: 7, color: "#FFFACD", type: "Жёлто-белый сверхгигант", fact: "2-я ярчайшая звезда. Навигационный ориентир NASA.", distance: "310 св. лет" },
  { id: "aldebaran", name: "Альдебаран", x: 220, y: 85, size: 8, color: "#FF8C00", type: "Красный гигант", fact: "В 44 раза крупнее Солнца. Сердце Тельца.", distance: "65 св. лет" },
];

const GalaxyMap = () => {
  const { isOpen, close } = useGalaxyMap();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgStarsRef = useRef<{ x: number; y: number; r: number; opacity: number }[]>([]);
  const camRef = useRef({ x: 0, y: 0, zoom: 1 });
  const pointerRef = useRef<{ dragging: boolean; lastX: number; lastY: number; startX: number; startY: number }>({
    dragging: false, lastX: 0, lastY: 0, startX: 0, startY: 0,
  });
  const rafRef = useRef<number>(0);
  const [selected, setSelected] = useState<StarSystem | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const timeRef = useRef(0);

  const project = useCallback((sys: StarSystem, W: number, H: number) => {
    const cam = camRef.current;
    return {
      cx: W / 2 + (sys.x + cam.x) * cam.zoom,
      cy: H / 2 + (sys.y + cam.y) * cam.zoom,
    };
  }, []);

  const getSystemAt = useCallback((mx: number, my: number, W: number, H: number) => {
    for (const sys of SYSTEMS) {
      const { cx, cy } = project(sys, W, H);
      if (Math.hypot(mx - cx, my - cy) < Math.max(sys.size * camRef.current.zoom, 18)) return sys;
    }
    return null;
  }, [project]);

  // Draw loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      bgStarsRef.current = Array.from({ length: 300 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 0.03 + 0.005,
        angle: Math.random() * Math.PI * 2,
      }));
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const draw = () => {
      timeRef.current += 0.01;
      const t = timeRef.current;
      const W = canvas.width;
      const H = canvas.height;

      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);

      // Background stars with slow drift
      for (const s of bgStarsRef.current) {
        // Slow drift
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        // Wrap around edges
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        const tw = Math.sin(t * 0.8 + s.x * 0.01) * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, Math.min(1, s.opacity + tw))})`;
        ctx.fill();
      }

      // Nebula
      const nebula = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.5);
      nebula.addColorStop(0, "rgba(100,60,200,0.08)");
      nebula.addColorStop(0.5, "rgba(40,80,180,0.04)");
      nebula.addColorStop(1, "transparent");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, W, H);

      // Connection lines
      const sorted = [...SYSTEMS].sort((a, b) => a.id.localeCompare(b.id));
      for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[(i + 2) % sorted.length];
        const pa = project(a, W, H);
        const pb = project(b, W, H);
        const lg = ctx.createLinearGradient(pa.cx, pa.cy, pb.cx, pb.cy);
        lg.addColorStop(0, `${a.color}40`);
        lg.addColorStop(1, `${b.color}18`);
        ctx.beginPath();
        ctx.moveTo(pa.cx, pa.cy);
        ctx.lineTo(pb.cx, pb.cy);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Star systems
      for (const sys of SYSTEMS) {
        const { cx, cy } = project(sys, W, H);
        const zoom = camRef.current.zoom;
        const r = sys.size * zoom;
        const isHov = hoveredRef.current === sys.id;

        if (cx < -r * 8 || cx > W + r * 8 || cy < -r * 8 || cy > H + r * 8) continue;

        // Glow
        const gr = isHov ? r * 6 : r * 4;
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, gr);
        glow.addColorStop(0, `${sys.color}${isHov ? "a0" : "60"}`);
        glow.addColorStop(0.4, `${sys.color}${isHov ? "40" : "20"}`);
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, gr, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Pulse ring
        if (isHov) {
          const pulse = (Math.sin(t * 3) + 1) / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 3 + pulse * r * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `${sys.color}80`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Core
        const core = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
        core.addColorStop(0, "#ffffff");
        core.addColorStop(0.3, sys.color);
        core.addColorStop(1, `${sys.color}cc`);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();

        // Label
        if (zoom > 0.4 || isHov) {
          const alpha = isHov ? 1 : Math.min(1, (zoom - 0.4) * 2.5);
          ctx.font = `${isHov ? "bold " : ""}${Math.max(10, 12 * zoom)}px sans-serif`;
          ctx.fillStyle = `rgba(230,230,255,${alpha})`;
          ctx.textAlign = "center";
          ctx.fillText(sys.name, cx, cy + r + 18);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [isOpen, project]);

  // Pointer (mouse + touch) events
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { mx: clientX - rect.left, my: clientY - rect.top };
    };

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      pointerRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY, startX: e.clientX, startY: e.clientY };
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      const { mx, my } = getPos(e.clientX, e.clientY);
      const p = pointerRef.current;

      if (p.dragging) {
        const dx = e.clientX - p.lastX;
        const dy = e.clientY - p.lastY;
        camRef.current.x += dx / camRef.current.zoom;
        camRef.current.y += dy / camRef.current.zoom;
        p.lastX = e.clientX;
        p.lastY = e.clientY;
        canvas.style.cursor = "grabbing";
      } else {
        const sys = getSystemAt(mx, my, canvas.width, canvas.height);
        hoveredRef.current = sys?.id ?? null;
        setHovered(sys?.id ?? null);
        canvas.style.cursor = sys ? "pointer" : "grab";
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const p = pointerRef.current;
      const moved = Math.hypot(e.clientX - p.startX, e.clientY - p.startY);
      p.dragging = false;
      canvas.style.cursor = "grab";
      if (moved < 8) {
        const { mx, my } = getPos(e.clientX, e.clientY);
        const sys = getSystemAt(mx, my, canvas.width, canvas.height);
        if (sys) setSelected(sys);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown, { passive: false });
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [isOpen, getSystemAt]);

  // Keyboard zoom
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "w" || e.key === "W" || e.key === "ц") {
        camRef.current.zoom = Math.min(5, camRef.current.zoom * 1.08);
      } else if (e.key === "s" || e.key === "S" || e.key === "ы") {
        camRef.current.zoom = Math.max(0.2, camRef.current.zoom * 0.92);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const flyTo = (sys: StarSystem) => {
    const startX = camRef.current.x;
    const startY = camRef.current.y;
    const targetX = -sys.x;
    const targetY = -sys.y;
    const startZoom = camRef.current.zoom;
    const targetZoom = 1.5;
    const start = Date.now();
    const dur = 900;
    const step = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      camRef.current.x = startX + (targetX - startX) * ease;
      camRef.current.y = startY + (targetY - startY) * ease;
      camRef.current.zoom = startZoom + (targetZoom - startZoom) * ease;
      if (p < 1) requestAnimationFrame(step);
    };
    step();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tap backdrop to close */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" onClick={close} />

          <motion.div
            className="relative w-full h-full sm:w-full sm:max-w-6xl sm:h-[85vh] glass-card sm:rounded-3xl overflow-hidden border border-primary/20 flex flex-col"
            initial={{ scale: 0.88, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 30, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header — close button FIRST on mobile */}
            <div className="relative z-20 flex items-center px-3 py-2.5 sm:px-6 sm:py-4 border-b border-border/50 bg-background/80 backdrop-blur-sm flex-shrink-0 gap-2">
              <button
                onClick={close}
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-border bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all flex-shrink-0"
                style={{ minWidth: "2.5rem", minHeight: "2.5rem" }}
              >
                <X size={18} />
              </button>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="font-display text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase leading-none">Карта</div>
                <h2 className="font-heading text-sm sm:text-xl uppercase leading-none truncate">Млечный Путь</h2>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-xs text-muted-foreground font-display tracking-wider ml-auto">
                <span className="flex items-center gap-1.5"><MousePointer2 size={13} /> Перетаскивание</span>
                <span className="flex items-center gap-1.5"><Keyboard size={13} /> W/S — масштаб</span>
                <span className="flex items-center gap-1.5"><Star size={13} /> Клик — инфо</span>
              </div>
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="flex-1 w-full min-h-0"
              style={{ cursor: "grab", touchAction: "none" }}
            />

            {/* Bottom system list */}
            <div className="relative z-20 border-t border-border/50 bg-background/80 backdrop-blur-sm flex-shrink-0">
              <div className="flex gap-1 px-2 py-2 overflow-x-auto scrollbar-hide">
                {SYSTEMS.map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() => { flyTo(sys); setSelected(sys); }}
                    className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] sm:text-xs font-display tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${
                      hovered === sys.id || selected?.id === sys.id
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sys.color, boxShadow: `0 0 4px ${sys.color}` }} />
                    <span className="max-[380px]:hidden">{sys.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  className="absolute bottom-[72px] sm:bottom-3 left-2 right-2 sm:left-auto sm:right-4 sm:w-72 z-30 glass-card rounded-2xl p-4 border border-border/60"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.28 }}
                >
                  <button onClick={() => setSelected(null)} className="absolute top-2 right-2 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                    <X size={12} />
                  </button>
                  <div className="flex items-center gap-2 mb-2 pr-5">
                    <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ background: selected.color, boxShadow: `0 0 8px ${selected.color}` }} />
                    <h3 className="font-heading text-sm sm:text-base leading-tight truncate">{selected.name}</h3>
                  </div>
                  <div className="font-display text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.2em] text-primary uppercase mb-0.5 truncate">{selected.type}</div>
                  <div className="font-display text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground uppercase mb-2">{selected.distance}</div>
                  <p className="text-[11px] sm:text-sm text-muted-foreground leading-snug line-clamp-3 sm:line-clamp-none">{selected.fact}</p>
                  <button onClick={() => flyTo(selected)} className="mt-2.5 w-full py-2 rounded-full border border-primary/40 text-[10px] sm:text-xs font-display tracking-widest uppercase text-primary hover:bg-primary/10 transition-all">
                    Приблизиться
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalaxyMap;
