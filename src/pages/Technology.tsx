import { motion } from "framer-motion";
import { Footprints, Droplets, Thermometer, Activity, Smartphone, Radio, Printer, Link, Sparkles, Sun, Glasses } from "lucide-react";
import SpaceNavbar from "@/components/SpaceNavbar";
import SpaceFooter from "@/components/SpaceFooter";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import StarCanvas from "@/components/StarCanvas";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import Planet3D from "@/components/Planet3D";
import ParallaxImageSection from "@/components/ParallaxImageSection";
import AnimatedCounter from "@/components/AnimatedCounter";
const TECH_IMG = "/images/space-tech.jpg";
const ISS_IMG = "/images/iss.jpg";

const timeline = [
  { year: "1960-е", title: "Пена с эффектом памяти", body: "NASA разработало вспененный материал для снижения перегрузок при посадке. Позже он стал знаменитой подошвой кроссовок Nike и основой ортопедических матрасов.", icon: Footprints },
  { year: "1970-е", title: "Фильтры для воды", body: "Системы очистки воды, созданные для космических станций, сегодня используются в бытовых фильтрах по всему миру. Технология позволяет удалять 99% бактерий.", icon: Droplets },
  { year: "1980-е", title: "Инфракрасный термометр", body: "Бесконтактный термометр был создан для измерения температуры далёких звёзд. Теперь врачи используют его ежедневно, особенно после пандемии COVID-19.", icon: Thermometer },
  { year: "1990-е", title: "Алгоритмы МРТ", body: "Алгоритмы цифровой обработки снимков, созданные для телескопа Хаббл, сегодня используются в МРТ-сканерах для обнаружения рака на ранних стадиях.", icon: Activity },
  { year: "2000-е", title: "Камеры CMOS", body: "Сенсоры изображения, разработанные для микроспутников NASA, сейчас установлены в 99% смартфонов мира. Каждое ваше селфи — космическая технология.", icon: Smartphone },
  { year: "2010-е", title: "GPS навигация", body: "Система глобального позиционирования изначально создана для военных спутников. Сегодня GPS встроен в каждый телефон и автомобиль. Точность — до 30 см.", icon: Radio },
  { year: "2020-е", title: "3D-печать тканей", body: "На борту МКС проводятся эксперименты по 3D-биопечати. Микрогравитация позволяет создавать более сложные структуры тканей, чем на Земле.", icon: Printer },
];

const inventions = [
  { name: "Застёжка-липучка", desc: "Velcro используется на скафандрах с 1960-х", icon: Link },
  { name: "Пылесос Black & Decker", desc: "Создан для сбора лунного грунта на Apollo", icon: Sparkles },
  { name: "Солнечные батареи", desc: "Разработаны для питания спутников", icon: Sun },
  { name: "Линзы с защитой", desc: "Покрытие для шлемов стало антибликовым слоем", icon: Glasses },
];

const TechnologyPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
  >
    <Preloader />
    <CustomCursor />
    <NoiseOverlay />
    <StarCanvas />
    <SpaceNavbar />
    <PageHero badge="Раздел 03" line1="ТЕХНОЛОГИИ" line2="ИЗ КОСМОСА" />

    {/* Intro */}
    <section className="pb-[6vw] px-[5vw]">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
          Космические исследования подарили человечеству тысячи изобретений, которые мы используем каждый день,
          даже не подозревая об их космическом происхождении. От камеры в вашем телефоне до подошвы ваших кроссовок.
        </p>
      </motion.div>
    </section>

    {/* Timeline */}
    <section className="pb-[8vw] px-[5vw]">
      <div className="max-w-3xl mx-auto space-y-0">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            className="relative pl-12 pb-12 border-l border-border last:pb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-secondary border border-primary/50 -translate-x-[18px] flex items-center justify-center">
              <item.icon size={16} className="text-primary" />
            </div>
            <div className="font-display text-xs tracking-[0.2em] text-primary mb-3 uppercase">{item.year}</div>
            <div className="glass-card rounded-2xl p-5 sm:p-8 hover:border-primary/20 transition-colors duration-300">
              <h3 className="font-heading text-xl mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Parallax */}
    <ParallaxImageSection src={TECH_IMG} alt="Space Tech" text="НАСЛЕДИЕ" />

    {/* Quick Inventions Grid */}
    <section className="py-[8vw] px-[5vw]">
      <motion.h2
        className="font-heading text-2xl sm:text-3xl mb-6 sm:mb-8 text-center uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Ещё изобретения из космоса
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {inventions.map((inv, i) => (
          <motion.div
            key={inv.name}
            className="glass-card rounded-2xl p-4 sm:p-6 text-center group hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <inv.icon size={32} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-heading text-sm mb-2">{inv.name}</h4>
            <p className="text-xs text-muted-foreground">{inv.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Counters */}
    <section className="py-[6vw] px-[5vw]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
        <AnimatedCounter end={2000} suffix="+" label="Технологий внедрено" />
        <AnimatedCounter end={6} label="Десятилетий инноваций" />
        <AnimatedCounter end={99} suffix="%" label="Смартфонов с CMOS" />
        <AnimatedCounter end={30} suffix=" см" label="Точность GPS" />
      </div>
    </section>

    {/* 3D + Future */}
    <section className="py-[8vw] px-[5vw]">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-2xl sm:text-3xl mb-3 sm:mb-4 uppercase">Будущие технологии</h3>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>Ионные двигатели нового поколения смогут доставить корабль к Марсу за 39 дней вместо 7 месяцев.</p>
            <p>Космические лифты из углеродных нанотрубок могут снизить стоимость вывода груза на орбиту в 100 раз.</p>
            <p>Добыча ресурсов на астероидах — один астероид класса M может содержать больше платины, чем добыто за всю историю Земли.</p>
          </div>
        </motion.div>
        <Planet3D color="#00ff88" distort={0.3} speed={0.4} className="w-full h-[400px]" />
      </div>
    </section>

    {/* Parallax ISS */}
    <ParallaxImageSection src={ISS_IMG} alt="МКС" text="ЛАБОРАТОРИЯ" />

    <SpaceFooter />
  </motion.div>
);

export default TechnologyPage;
