import { motion } from "framer-motion";
import { Gem, Flame, Cloud, Wind, CircleDot, Mountain } from "lucide-react";
import SpaceNavbar from "@/components/SpaceNavbar";
import SpaceFooter from "@/components/SpaceFooter";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import StarCanvas from "@/components/StarCanvas";
import PageHero from "@/components/PageHero";
import FactCard from "@/components/FactCard";
import Preloader from "@/components/Preloader";
import Planet3D from "@/components/Planet3D";
import ParallaxImageSection from "@/components/ParallaxImageSection";
import ImageGallery from "@/components/ImageGallery";
import AnimatedCounter from "@/components/AnimatedCounter";
const NEPTUNE_IMG = "/images/planet-neptune.jpg";
const URANUS_IMG = "/images/planet-uranus.jpg";
const SATURN_IMG = "/images/saturn.jpg";
const MARS_IMG = "/images/mars-surface.jpg";

const facts = [
  { icon: Gem, number: "Нептун", title: "Алмазные дожди", body: "Огромное давление в 200 000 атмосфер кристаллизует углерод, превращая его в алмазы размером до нескольких каратов. Они непрерывно падают сквозь атмосферу к ядру планеты.", tag: "Ледяной гигант" },
  { icon: Flame, number: "Уран", title: "Горящий лёд", body: "Вода при -200°C находится в экзотическом «суперионном» состоянии — одновременно твёрдая и жидкая. Она проводит электричество и создаёт аномальное магнитное поле планеты.", tag: "Аномалии" },
  { icon: Cloud, number: "Млечный путь", title: "Запах малины", body: "В центре нашей галактики обнаружено гигантское молекулярное облако, содержащее этилформиат — вещество, придающее малине характерный вкус и аромат.", tag: "Астрохимия" },
  { icon: Wind, number: "Юпитер", title: "Вечный шторм", body: "Большое Красное Пятно — это антициклон, бушующий уже более 350 лет. Его размер в 1,3 раза превышает диаметр Земли. Скорость ветра достигает 640 км/ч.", tag: "Газовый гигант" },
  { icon: CircleDot, number: "Сатурн", title: "Планета-поплавок", body: "Несмотря на огромные размеры, Сатурн настолько мало плотный, что мог бы плавать в воде — если бы нашлась достаточно большая ванна. Его плотность — 0.69 г/см³.", tag: "Газовый гигант" },
  { icon: Mountain, number: "Венера", title: "Адская поверхность", body: "Температура на поверхности Венеры — 465°C, выше, чем на Меркурии. Атмосферное давление в 90 раз сильнее земного. Дождь из серной кислоты испаряется, не достигая поверхности.", tag: "Земная группа" },
];

const gallery = [
  { src: NEPTUNE_IMG, alt: "Нептун", caption: "Нептун — ледяной гигант" },
  { src: URANUS_IMG, alt: "Уран", caption: "Уран — наклонённая планета" },
  { src: SATURN_IMG, alt: "Сатурн", caption: "Кольца Сатурна" },
];

const PlanetsPage = () => (
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
    <PageHero badge="Раздел 02" line1="ПЛАНЕТЫ" line2="ЗАГАДКИ" />

    {/* Intro */}
    <section className="pb-[6vw] px-[5vw]">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
          Каждая планета Солнечной системы — это целый мир с уникальными условиями, которые бросают вызов нашему воображению. 
          Алмазные дожди, суперионный лёд, гигантские штормы — реальность космоса причудливее любой фантастики.
        </p>
      </motion.div>
    </section>

    {/* Cards */}
    <section className="pb-[8vw] px-[5vw]">
      <div className="grid md:grid-cols-3 gap-6">
        {facts.map((f) => (
          <FactCard key={f.number} {...f} />
        ))}
      </div>
    </section>

    {/* Parallax Mars */}
    <ParallaxImageSection src={MARS_IMG} alt="Mars" text="КРАСНАЯ ПЛАНЕТА" />

    {/* 3D Planets */}
    <section className="py-[8vw] px-[5vw]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-2xl sm:text-3xl mb-3 sm:mb-4 uppercase">Экзопланеты</h3>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>За пределами Солнечной системы обнаружено более 5 500 экзопланет. Некоторые из них находятся в «зоне обитаемости» — области, где возможно существование жидкой воды.</p>
            <p>Планета KELT-9b — самая горячая известная экзопланета. Температура её дневной стороны достигает 4 300°C, что горячее многих звёзд.</p>
            <p>HD 189733b — планета, где идут дожди из расплавленного стекла при ветре 7 000 км/ч. Её голубой цвет обманчив.</p>
          </div>
        </motion.div>
        <Planet3D color="#00e5ff" distort={0.5} speed={0.2} size={2} className="w-full h-[450px]" />
      </div>
    </section>

    {/* Counters */}
    <section className="py-[6vw] px-[5vw]">
      <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-xl sm:rounded-2xl overflow-hidden">
        <AnimatedCounter end={8} label="Планет в Солнечной системе" />
        <AnimatedCounter end={5500} suffix="+" label="Найденных экзопланет" />
        <AnimatedCounter end={79} label="Спутников Юпитера" />
        <AnimatedCounter end={465} suffix="°C" label="Температура Венеры" />
      </div>
    </section>

    {/* Gallery */}
    <section className="py-[6vw] px-[5vw]">
      <motion.h2
        className="font-heading text-2xl sm:text-3xl mb-6 sm:mb-8 text-center uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Галерея планет
      </motion.h2>
      <ImageGallery images={gallery} />
    </section>

    {/* 2nd 3D + fact */}
    <section className="py-[8vw] px-[5vw]">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Planet3D color="#ff6633" distort={0.2} speed={0.15} size={1.8} className="w-full h-[400px] order-2 md:order-1" />
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-3xl mb-4 uppercase">Марс — будущий дом?</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Олимп — крупнейший вулкан в Солнечной системе, высотой 21 км (в 2,5 раза выше Эвереста). Его основание размером с Францию.</p>
            <p>Марсианские сутки длятся 24 часа 37 минут — почти как земные. Это делает Марс наиболее удобным кандидатом для колонизации.</p>
            <p>Долина Маринер — гигантский каньон длиной 4 000 км и глубиной до 7 км. Гранд-Каньон поместился бы в него как небольшая трещина.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <SpaceFooter />
  </motion.div>
);

export default PlanetsPage;
