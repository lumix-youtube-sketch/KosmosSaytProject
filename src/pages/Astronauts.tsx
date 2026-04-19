import { motion } from "framer-motion";
import { Droplet, Hand, Sandwich, Ruler, Heart, Guitar } from "lucide-react";
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
const ASTRONAUT_IMG = "/images/astronaut.jpg";
const SPACEWALK_IMG = "/images/spacewalk.jpg";
const ISS_IMG = "/images/iss.jpg";

const facts = [
  { icon: Droplet, number: "Факт 01", title: "Слезы в невесомости", body: "В условиях микрогравитации слёзы собираются в жгучие водяные шары прямо на глазах. Они не стекают, а остаются на месте, вызывая жжение. Заплакать классически невозможно.", tag: "Физиология" },
  { icon: Hand, number: "Факт 02", title: "Перчатка-спутник", body: "В 1965 году Эдвард Уайт упустил перчатку во время выхода в открытый космос. Она летала по орбите со скоростью 28 000 км/ч целый месяц, став одним из первых объектов космического мусора.", tag: "Инциденты" },
  { icon: Sandwich, number: "Факт 03", title: "Космическая контрабанда", body: "Джон Янг тайно пронёс на орбиту сэндвич с солониной на борт Gemini-3 в 1965 году. Крошки в невесомости могли попасть в приборы и закоротить электронику корабля. NASA был в ярости.", tag: "Нарушения" },
  { icon: Ruler, number: "Факт 04", title: "Рост в космосе", body: "Без гравитации позвоночник расправляется, и космонавты вырастают на 3-5 сантиметров за время полёта. При возвращении на Землю рост возвращается к норме за несколько недель.", tag: "Физиология" },
  { icon: Heart, number: "Факт 05", title: "Сердце меняет форму", body: "В невесомости сердце принимает более округлую форму, поскольку ему не нужно бороться с гравитацией для перекачки крови. Это открытие сделано с помощью УЗИ на борту МКС.", tag: "Медицина" },
  { icon: Guitar, number: "Факт 06", title: "Концерт на орбите", body: "Канадский астронавт Крис Хэдфилд записал кавер на Space Oddity Дэвида Боуи прямо на борту МКС. Видео стало первым музыкальным клипом, снятым в космосе.", tag: "Культура" },
];

const gallery = [
  { src: ASTRONAUT_IMG, alt: "Астронавт", caption: "Выход в открытый космос" },
  { src: SPACEWALK_IMG, alt: "Spacewalk", caption: "Ремонт на орбите" },
  { src: ISS_IMG, alt: "МКС", caption: "Международная космическая станция" },
];

const AstronautsPage = () => (
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
    <PageHero badge="Раздел 01" line1="КУРЬЁЗЫ" line2="С КОСМОНАВТАМИ" />

    {/* Intro */}
    <section className="pb-[6vw] px-[5vw]">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
          С момента первого полёта человека в космос в 1961 году произошло множество удивительных, 
          забавных и порой пугающих случаев. Космонавты сталкиваются с ситуациями, к которым невозможно 
          подготовиться на Земле.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          От изменений в теле до бытовых неожиданностей — жизнь на орбите полна сюрпризов. 
          Вот самые необычные факты о людях, побывавших за пределами атмосферы.
        </p>
      </motion.div>
    </section>

    {/* Fact Cards */}
    <section className="pb-[8vw] px-[5vw]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {facts.map((f, i) => (
          <FactCard key={f.number} {...f} />
        ))}
      </div>
    </section>

    {/* Parallax */}
    <ParallaxImageSection src={SPACEWALK_IMG} alt="Выход в космос" text="НЕВЕСОМОСТЬ" />

    {/* 3D + Additional info */}
    <section className="py-[8vw] px-[5vw]">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Planet3D color="#4da6ff" distort={0.3} size={1.5} className="w-full h-[400px]" />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-2xl sm:text-3xl mb-3 sm:mb-4 uppercase">Жизнь на орбите</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Космонавты на МКС видят 16 рассветов и 16 закатов каждый день, потому что станция облетает Землю за 90 минут.</p>
            <p>Без гравитации жидкости в теле перераспределяются к голове. Лица космонавтов отекают, а ноги становятся тоньше — это называется «птичьи ноги».</p>
            <p>Во сне космонавты привязывают себя к стене спальным мешком, иначе они будут плавать по станции.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8">
            {[
              { val: "437", unit: "дней", desc: "рекорд в космосе" },
              { val: "90", unit: "мин", desc: "виток вокруг Земли" },
              { val: "5 см", unit: "", desc: "рост за полёт" },
            ].map((s) => (
              <div key={s.desc} className="glass-card rounded-xl p-3 sm:p-4 text-center">
                <div className="font-heading text-xl gradient-text-primary">{s.val}<span className="text-sm">{s.unit}</span></div>
                <div className="text-[0.6rem] text-muted-foreground mt-1 uppercase tracking-wider">{s.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Gallery */}
    <section className="py-[6vw] px-[5vw]">
      <motion.h2
        className="font-heading text-3xl mb-8 text-center uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Фотоархив
      </motion.h2>
      <ImageGallery images={gallery} />
    </section>

    <SpaceFooter />
  </motion.div>
);

export default AstronautsPage;
