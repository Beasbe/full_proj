import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Проектирование",
    description:
      "Создаем уникальные архитектурные решения, сочетающие эстетику, функциональность и инновационные технологии. Разрабатываем проекты любой сложности.",
    image: "/service-1.png",
  },
  {
    id: 2,
    title: "Строительство",
    description:
      "Проектируем современные инженерные системы: отопление, вентиляцию, водоснабжение, электроснабжение с учетом энергоэффективности.",
    image: "/service-2.png",
  },
  {
    id: 3,
    title: "Эксплуатация",
    description:
      "Создаем фотореалистичные 3D-визуализации и интерактивные модели будущих объектов для наглядной презентации проектов.",
    image: "/service-3.png",
  },
  {
    id: 4,
    title: "BIM-проектирование",
    description:
      "Обеспечиваем контроль соответствия строительных работ проектной документации на всех этапах строительства.",
    image: "/service-4.webp",
  },
];

export default function Services() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-copy-primary text-center mb-10 md:mb-12 lg:mb-16">
          Виды деятельности
        </h2>

        {/* Карточки услуг */}
        <div className="flex flex-col items-center space-y-6 md:space-y-8 lg:space-y-10">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              imagePosition={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  imagePosition,
}: {
  service: (typeof services)[0];
  imagePosition: "left" | "right";
}) {
  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto">
      <div
        className={`
          bg-card shadow-md overflow-hidden border border-border
          transition-all duration-500 ease-out
          hover:shadow-xl hover:scale-[1.02] hover:border-cta/30
          group
        `}
      >
        <div
          className={`
          flex flex-col
          ${imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"}
          items-stretch
        `}
        >
          {/* Блок с фото */}
          <div className="relative w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Затемнение при наведении для лучшей читаемости текста (опционально) */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>

          {/* Блок с текстом */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-copy-primary mb-3 md:mb-4 transition-colors duration-300 group-hover:text-cta">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-copy-secondary leading-relaxed max-w-md">
              {service.description}
            </p>

            {/* Декоративная линия при наведении (опционально) */}
            <div className="w-12 h-0.5 bg-cta/0 group-hover:bg-cta/50 mt-4 transition-all duration-500 group-hover:w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
