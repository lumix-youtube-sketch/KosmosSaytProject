import { motion } from "framer-motion";
import { Globe, BookOpen, Telescope, Star, Rocket } from "lucide-react";
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
const MILKY_IMG = "/images/milky-way.jpg";

const sources = [
  { icon: Globe, number: "NASA", title: "Агентство США", body: "Национальное управление по аэронавтике и исследованию космического пространства. Главный первоисточник большинства фактов об аппаратах, миссиях и исследованиях глубокого космоса.", href: "https://www.nasa.gov" },
  { icon: Globe, number: "ESA", title: "Европейское космическое агентство", body: "Объединяет усилия 22 государств Европы. Лучшие данные по кометам, Марсу и экзопланетам. Миссии Rosetta, ExoMars, JUICE.", href: "https://www.esa.int" },
  { icon: Globe, number: "Роскосмос", title: "Государственная корпорация", body: "Российское космическое агентство. Отвечает за пилотируемые полёты на МКС, запуски на ракетах-носителях «Союз» и «Протон».", href: "https://www.roscosmos.ru" },
  { icon: BookOpen, number: "arXiv", title: "Научный архив", body: "Открытый архив научных статей по астрофизике, космологии и планетологии. Более 2 миллионов публикаций ведущих учёных мира.", href: "https://arxiv.org" },
  { icon: Telescope, number: "Hubble", title: "Космический телескоп", body: "Данные и изображения с космического телескопа Хаббл, работающего на орбите с 1990 года. Более 1,5 миллиона наблюдений.", href: "https://hubblesite.org" },
  { icon: Telescope, number: "JWST", title: "Телескоп Джеймса Уэбба", body: "Самый мощный космический телескоп, запущенный в 2021 году. Позволяет заглянуть в самые ранние эпохи Вселенной.", href: "https://webbtelescope.org" },
];

const books = [
  { title: "Краткая история времени", author: "Стивен Хокинг", icon: BookOpen },
  { title: "Космос", author: "Карл Саган", icon: Globe },
  { title: "Занимательная астрономия", author: "Яков Перельман", icon: Star },
  { title: "Астрофизика с космической скоростью", author: "Нил Деграсс Тайсон", icon: Rocket },
];

const SourcesPage = () => (
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
    <PageHero badge="Раздел 04" line1="ИСТОЧНИКИ" line2="ДАННЫХ" />

    {/* Intro */}
    <section className="pb-[6vw] px-[5vw]">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Все факты и данные на этом сайте основаны на информации из авторитетных научных источников. 
          Ниже представлены организации и ресурсы, которые мы использовали для подготовки материалов.
        </p>
      </motion.div>
    </section>

    {/* Source Cards */}
    <section className="pb-[8vw] px-[5vw]">
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sources.map((s) => (
          <FactCard key={s.number} {...s} />
        ))}
      </div>
    </section>

    {/* Parallax */}
    <ParallaxImageSection src={MILKY_IMG} alt="Milky Way" text="ПОЗНАНИЕ" />

    {/* Recommended Books */}
    <section className="py-[8vw] px-[5vw]">
      <motion.h2
        className="font-heading text-2xl sm:text-3xl mb-6 sm:mb-8 text-center uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Рекомендуемые книги
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {books.map((book, i) => (
          <motion.div
            key={book.title}
            className="glass-card rounded-2xl p-6 text-center group hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <book.icon size={40} className="mb-4 group-hover:scale-125 transition-transform duration-300 text-primary" />
            <h4 className="font-heading text-sm mb-2 leading-tight">{book.title}</h4>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* 3D + closing text */}
    <section className="py-[8vw] px-[5vw]">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        <Planet3D color="#9966ff" distort={0.4} speed={0.3} className="w-full h-[400px]" />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-3xl mb-4 uppercase">Продолжай исследовать</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Космос — это бесконечный источник знаний и вдохновения. Каждый день учёные делают новые открытия, которые меняют наше понимание Вселенной.</p>
            <p>Все данные на этом сайте проверены по нескольким независимым научным источникам. Мы стремимся представлять только достоверные факты.</p>
            <p>Если вы хотите узнать больше — переходите по ссылкам выше или читайте рекомендованные книги. Космос ждёт!</p>
          </div>
        </motion.div>
      </div>
    </section>

    <SpaceFooter />
  </motion.div>
);

export default SourcesPage;
