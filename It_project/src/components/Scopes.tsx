import {
  BuildingOfficeIcon,
  HomeModernIcon,
  TruckIcon,
  BoltIcon,
  BeakerIcon,
  SunIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

// Массив с направлениями
const directions = [
  {
    id: 1,
    title: "Промышленное проектирование",
    description:
      "Проектирование заводов, фабрик, производственных цехов и складских комплексов любой сложности.",
    icon: BuildingOfficeIcon,
  },
  {
    id: 2,
    title: "Гражданское строительство",
    description:
      "Жилые комплексы, офисные здания, торговые центры и объекты социальной инфраструктуры.",
    icon: HomeModernIcon,
  },
  {
    id: 3,
    title: "Транспортная инфраструктура",
    description:
      "Дороги, мосты, тоннели, развязки и транспортные узлы с применением современных технологий.",
    icon: TruckIcon,
  },
  {
    id: 4,
    title: "Энергетические объекты",
    description:
      "Электростанции, подстанции, котельные и инженерные сети энергоснабжения.",
    icon: BoltIcon,
  },
  {
    id: 5,
    title: "Гидротехнические сооружения",
    description:
      "Плотины, дамбы, каналы, системы водоснабжения и водоотведения.",
    icon: BeakerIcon,
  },
  {
    id: 6,
    title: "Ландшафтное проектирование",
    description:
      "Благоустройство территорий, парки, скверы и рекреационные зоны.",
    icon: SunIcon,
  },
  {
    id: 7,
    title: "Реконструкция и реставрация",
    description:
      "Восстановление и модернизация существующих зданий и сооружений с сохранением исторического облика.",
    icon: WrenchScrewdriverIcon,
  },
];

export default function Directions() {
  return (
    <section className="py-12 md:py-16 bg-background transition-theme">
      {/* Заголовок */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-copy-primary text-center mb-10 md:mb-12 lg:mb-16">
        Направления работ
      </h2>

      {/* Сетка карточек */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto px-4">
        {directions.map((direction) => (
          <div
            key={direction.id}
            className="w-full sm:w-[calc(50%-1rem)] max-w-md"
          >
            <DirectionCard direction={direction} />
          </div>
        ))}
      </div>
    </section>
  );
}

function DirectionCard({ direction }: { direction: (typeof directions)[0] }) {
  const IconComponent = direction.icon;

  return (
    <div className="group relative bg-card border border-default border-border pt-8 pb-6 px-6 h-full transition-theme hover:border-cta hover:shadow-lg">
      {/* Иконка с фоном - перекрывает верхнюю границу */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cta text-cta-text p-3 rounded-lg shadow-md z-10 transition-colors duration-300">
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Контент карточки */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-copy-primary mb-3 text-center transition-colors duration-300 group-hover:text-cta">
          {direction.title}
        </h3>
        <p className="text-sm md:text-base text-copy-secondary leading-relaxed text-center">
          {direction.description}
        </p>
      </div>

      {/* Декоративная линия */}
      <div className="mt-4 h-1 w-12 bg-cta rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto" />
    </div>
  );
}
