import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Globe, Satellite, Quote, Map } from "lucide-react";
const HERO_IMG = "/images/hero-space.jpg";
const ASTRONAUT_IMG = "/images/astronaut.jpg";
const NEPTUNE_IMG = "/images/planet-neptune.jpg";
const TECH_IMG = "/images/space-tech.jpg";
const DEEP_IMG = "/images/deep-space.jpg";
const ISS_IMG = "/images/iss.jpg";
const MILKY_IMG = "/images/milky-way.jpg";
import SpaceNavbar from "@/components/SpaceNavbar";
import SpaceFooter from "@/components/SpaceFooter";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import StarCanvas from "@/components/StarCanvas";
import Planet3D from "@/components/Planet3D";
import AnimatedCounter from "@/components/AnimatedCounter";
import ParallaxImageSection from "@/components/ParallaxImageSection";
import { Link } from "react-router-dom";

const cards = [
  {
    img: ASTRONAUT_IMG,
    num: "01",
    title: "Люди в пустоте",
    desc: "Слезы не текут в невесомости, они превращаются в жгучие шары. А потерянные перчатки становятся пулями со скоростью 28 000 км/ч.",
    link: "/astronauts",
    linkText: "Изучить архивы",
  },
  {
    img: NEPTUNE_IMG,
    num: "02",
    title: "Мертвые миры",
    desc: "На Нептуне идут дожди из алмазов, а центр нашей галактики пахнет свежей малиной из-за гигантских облаков этилформиата.",
    link: "/planets",
    linkText: "Смотреть данные",
  },
  {
    img: TECH_IMG,
    num: "03",
    title: "Земное наследие",
    desc: "GPS, камеры смартфонов, фильтры для воды и пена в матрасах — всё это было создано для выживания в космосе.",
    link: "/technology",
    linkText: "Технологии",
  },
];

const aboutItems = [
  {
    icon: Rocket,
    label: "Люди в космосе",
    desc: "Риски, быт и рекорды",
    link: "/astronauts",
    color: "#00e5ff",
    num: "01",
  },
  {
    icon: Globe,
    label: "Планеты и явления",
    desc: "От гигантов до экстремальной физики",
    link: "/planets",
    color: "#ff3366",
    num: "02",
  },
  {
    icon: Satellite,
    label: "Технологии",
    desc: "Что из космоса работает у нас дома",
    link: "/technology",
    color: "#a855f7",
    num: "03",
  },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <Preloader />
      <CustomCursor />
      <NoiseOverlay />
      <StarCanvas />
      <SpaceNavbar />

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end p-[5vw] overflow-hidden">
        <motion.div className="absolute inset-0 -top-[10%] -left-[5%] w-[110%] h-[120%] z-0" style={{ y: heroY, scale: heroScale }}>
          <motion.img
            src={HERO_IMG}
            alt="Space"
            className="w-full h-full object-cover brightness-[0.5] contrast-[1.2]"
            width={1920}
            height={1080}
            initial={{ filter: "blur(20px) brightness(0.2)" }}
            animate={{ filter: "blur(0px) brightness(0.5)" }}
            transition={{ duration: 2.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
        {/* Improved gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent z-[1]" />
        <motion.div className="relative z-10 mb-[5vh]" style={{ opacity: heroOpacity }}>
          <motion.div
            className="font-display text-sm tracking-[0.3em] text-primary mb-4 uppercase flex items-center gap-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            ГЛАВНАЯ ЭКСПЕДИЦИЯ
          </motion.div>
          <motion.h1
            className="font-heading text-[clamp(3rem,10vw,12rem)] leading-[0.85] uppercase mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <span className="block">БЕСКОНЕЧНАЯ</span>
            <span className="block text-stroke">ПУСТОТА</span>
          </motion.h1>
          <motion.p
            className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3 }}
          >
            Выйди за пределы атмосферы. Открой факты, которые перевернут твое сознание. Мы собрали то, о чем молчат учебники.
          </motion.p>
          <motion.button
            onClick={() => document.dispatchEvent(new CustomEvent("open-galaxy-map"))}
            className="mt-4 inline-flex items-center gap-2 text-sm font-display tracking-widest uppercase text-primary border border-primary/40 rounded-full px-5 py-2.5 hover:bg-primary/10 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            <Map size={16} /> Открыть карту галактики
          </motion.button>

        </motion.div>

        <div className="absolute bottom-[5vw] right-[5vw] flex flex-col items-center gap-2 mix-blend-difference z-10">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase" style={{ writingMode: "vertical-rl" }}>Скролл вниз</span>
          <div className="w-px h-16 bg-foreground/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-[6vw] border-y border-border overflow-hidden">
        <div className="whitespace-nowrap font-display text-[4vw] text-stroke uppercase">
          <div className="inline-block animate-marquee">
            <span>АСТРОФИЗИКА • ПЛАНЕТОЛОГИЯ • ВАКУУМ • ТЕМНАЯ МАТЕРИЯ • СИНГУЛЯРНОСТЬ • КВАЗАРЫ • </span>
            <span>АСТРОФИЗИКА • ПЛАНЕТОЛОГИЯ • ВАКУУМ • ТЕМНАЯ МАТЕРИЯ • СИНГУЛЯРНОСТЬ • КВАЗАРЫ • </span>
            <span>АСТРОФИЗИКА • ПЛАНЕТОЛОГИЯ • ВАКУУМ • ТЕМНАЯ МАТЕРИЯ • СИНГУЛЯРНОСТЬ • КВАЗАРЫ • </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT — redesigned in site style
          ═══════════════════════════════════════════════════════ */}
      <section id="about" className="py-[8vw] px-[5vw] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full bg-primary/[0.04] blur-[120px]" />
        </div>

        {/* Badge + heading */}
        <motion.div
          className="mb-[5vw]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-display text-xs tracking-[0.35em] text-primary uppercase mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            О ПРОЕКТЕ
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-[4vw]">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,6rem)] leading-[0.88] uppercase">
              <span className="block">О чём</span>
              <span className="block text-stroke">этот сайт</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md md:mb-2 text-base md:text-lg">
              Визуальный образовательный проект о космосе: реальные факты о космонавтах,
              планетах и технологиях, которые пришли в обычную жизнь из космических программ.
            </p>
          </div>
        </motion.div>

        {/* Three cards — full-width, side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {aboutItems.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                to={item.link}
                className="group relative flex flex-col p-4 sm:p-6 md:p-10 bg-background hover:bg-secondary/20 transition-colors duration-500 h-full"
              >
                {/* Number */}
                <div className="font-display text-3xl sm:text-4xl md:text-[4rem] font-bold leading-none text-foreground/[0.04] select-none absolute top-3 right-4 md:top-4 md:right-6">
                  {item.num}
                </div>

                {/* Icon with glow */}
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    boxShadow: `0 0 0 0 ${item.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${item.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${item.color}00`;
                  }}
                >
                  <item.icon size={22} />
                </div>

                <h3 className="font-heading text-base sm:text-xl uppercase mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>

                {/* Arrow */}
                <div className="mt-4 sm:mt-6 flex items-center gap-2 text-xs font-display tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  <span>Перейти</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >→</motion.span>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)` }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3D Planet + Intro Text */}
      <section className="py-[8vw] px-[5vw] relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-display text-xs tracking-[0.3em] text-primary mb-4 uppercase">ИНТЕРАКТИВНАЯ МОДЕЛЬ</div>
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] mb-6">
              ИССЛЕДУЙ<br /><span className="text-stroke">ВСЕЛЕННУЮ</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              Перед вами интерактивная 3D-модель далёкой экзопланеты. Вселенная содержит более 2 триллионов галактик,
              каждая из которых включает сотни миллиардов звёзд. Масштабы, которые невозможно осознать.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Наш Млечный Путь — лишь одна из этих галактик, а Солнечная система занимает в ней крохотную точку.
              Свет от ближайшей звезды, Проксимы Центавра, летит к нам 4,24 года.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Planet3D color="#00e5ff" distort={0.3} speed={0.3} className="w-full h-[400px] md:h-[500px]" />
          </motion.div>
        </div>
      </section>

      {/* Cards section */}
      <section className="py-[8vw] px-[5vw]">
        <motion.div
          className="text-center mb-[6vw]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-display text-xs tracking-[0.3em] text-primary mb-4 uppercase">РАЗДЕЛЫ ЭКСПЕДИЦИИ</div>
          <h2 className="font-heading text-[clamp(2rem,6vw,5rem)] leading-[0.9]">
            ЧЕТЫРЕ<br />ИЗМЕРЕНИЯ
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base sm:text-lg">
            Путешествие только начинается. Выбери направление и погрузись в факты, которые изменят твоё представление о космосе.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              className="group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <div className="overflow-hidden rounded-2xl mb-6 aspect-[4/5] relative">
                <motion.img
                  src={card.img}
                  alt={card.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out"
                  whileHover={{ scale: 1.08 }}
                  initial={{ filter: "brightness(0.7) saturate(0.8)" }}
                  whileInView={{ filter: "brightness(0.85) saturate(1)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1 + 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent transition-opacity duration-700 group-hover:opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                  <div className="font-display text-xs text-primary tracking-[0.2em] mb-2">{card.num}</div>
                  <h3 className="font-heading text-lg sm:text-2xl uppercase">{card.title}</h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{card.desc}</p>
              <Link
                to={card.link}
                className="inline-block px-6 py-3 text-xs font-display uppercase tracking-widest rounded-full border border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                {card.linkText}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Animated Counters */}
      <section className="py-[6vw] px-[5vw]">
        <motion.div
          className="text-center mb-6 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-display text-xs tracking-[0.3em] text-primary mb-3 uppercase">ЦИФРЫ КОСМОСА</div>
          <h2 className="font-heading text-[clamp(1.5rem,4vw,3rem)]">В ЧИСЛАХ</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          <AnimatedCounter end={2000} suffix="+" label="Технологий внедрено" />
          <AnimatedCounter end={16} label="Рассветов в день на МКС" />
          <AnimatedCounter end={400} label="Км — высота МКС" />
          <AnimatedCounter end={28000} label="Км/ч — скорость МКС" />
        </div>
      </section>

      {/* Parallax Deep Space — smoother transition */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <ParallaxImageSection src={DEEP_IMG} alt="Deep Space" text="СИНГУЛЯРНОСТЬ" height="h-[120vh]" />
      </motion.div>

      {/* Quote Section */}
      <section className="py-[12vw] sm:py-[10vw] px-[5vw]">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Quote size={32} className="mb-4 sm:mb-8 opacity-30 text-foreground mx-auto" />
          <blockquote className="font-heading text-base sm:text-lg md:text-[clamp(1.2rem,3vw,2.5rem)] leading-[1.3] mb-6 sm:mb-8">
            Земля — колыбель человечества, но нельзя вечно жить в колыбели.
          </blockquote>
          <div className="font-display text-xs tracking-[0.3em] text-primary uppercase">
            Константин Циолковский
          </div>
        </motion.div>
      </section>

      {/* Milky Way parallax — smoother */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <ParallaxImageSection src={MILKY_IMG} alt="Milky Way" text="МЛЕЧНЫЙ ПУТЬ" />
      </motion.div>

      {/* 2nd 3D model + fact */}
      <section className="py-[8vw] px-[5vw]">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 md:order-1"
          >
            <Planet3D color="#ff3366" distort={0.6} speed={0.5} className="w-full h-[400px] md:h-[500px]" />
          </motion.div>
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-display text-xs tracking-[0.3em] text-accent mb-4 uppercase">ЗНАЕТЕ ЛИ ВЫ</div>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] mb-6">
              КРАСНЫЙ<br /><span className="text-stroke">ГИГАНТ</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Через 5 миллиардов лет наше Солнце превратится в красного гиганта, увеличившись в 200 раз.
              Орбиты Меркурия, Венеры и, возможно, Земли будут поглощены.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Крупнейшая известная звезда — UY Щита. Её диаметр в 1700 раз больше Солнца. Если поместить
              её в центр Солнечной системы, она поглотит орбиту Юпитера.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="glass-card rounded-xl p-3 sm:p-4 text-center">
                <div className="font-heading text-2xl gradient-text-primary">5 млрд</div>
                <div className="text-xs text-muted-foreground mt-1">лет до красного гиганта</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="font-heading text-2xl gradient-text-primary">×1700</div>
                <div className="text-xs text-muted-foreground mt-1">диаметр UY Щита vs Солнце</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-[10vw] px-[5vw]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {[
            { num: "-270°C", label: "Температура космоса" },
            { num: "3.8cm", label: "Луна удаляется в год" },
            { num: "13.8", label: "Млрд лет — возраст Вселенной" },
            { num: "93", label: "Млрд св. лет — диаметр Вселенной" },
          ].map((stat, i) => (
            <motion.div
              key={stat.num}
              className="bg-background p-4 sm:p-6 md:p-[4vw] text-center flex flex-col justify-center hover:bg-secondary/20 transition-colors duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="font-heading text-[clamp(1.5rem,4vw,3rem)] mb-2 gradient-text">{stat.num}</div>
              <div className="font-display text-[10px] sm:text-xs md:text-[clamp(0.45rem,0.7vw,0.7rem)] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <SpaceFooter />
    </motion.div>
  );
};

export default Index;