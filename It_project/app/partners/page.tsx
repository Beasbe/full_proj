// app/partners/page.tsx
"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";

// Данные о партнёрах — исправлены пути к изображениям (файлы должны лежать в public/partners/)
const partnersData = [
  {
    id: 1,
    name: "ЗАО «Лайт Коммуникейшн Калуга»",
    shortName: "LightCom Калуга",
    description:
      "Лайт Коммуникейшн Калуга — это первая компания группы Lightcom в калужском регионе. К настоящему моменту она существует уже около 10 лет. Специализируется на поставке оборудования для проектов СКУД, СКС, видеонаблюдения, телефонизации и других.",
    logo: "/partners/lightcom.jpg",
    sticker: "💡",
    website: "https://www.lc-kaluga.ru/",
    tags: ["Поставка оборудования", "СКУД", "Видеонаблюдение"],
  },
  {
    id: 2,
    name: "Умный дом",
    shortName: "Умный дом",
    description:
      "Подразделение компании «Лайт ПРОЕКТ», которое занимается оснащением умных домов. Специализируется на работе с частными заказчиками, предлагая современные решения автоматизации и комфорта.",
    logo: "/partners/smarthome.jpg",
    sticker: "🏠",
    website: "#",
    tags: ["Умный дом", "Частным клиентам", "Автоматизация"],
  },
  {
    id: 3,
    name: "КОДОС",
    shortName: "КОДОС",
    description:
      "КОДОС — российский производитель систем безопасности. Под брендом КОДОС производится продукция для организации систем контроля и управления доступом, охранно-пожарной сигнализации, а также цифрового видеонаблюдения.",
    logo: "/partners/kodos.png",
    sticker: "🔒",
    website: "https://kodos.ru/",
    tags: ["Производство", "СКУД", "ОПС", "Видеонаблюдение"],
  },
  {
    id: 4,
    name: "ДевЛайн",
    shortName: "ДевЛайн",
    description:
      "Компания «ДевЛайн» — российский разработчик и производитель цифровой системы видеонаблюдения под брендом «Лини». Центральный офис находится в Краснодаре. Дилерская сеть распространена по всей России и СНГ. Мы являемся официальным дилером ДевЛайн.",
    logo: "/partners/devline.jpg",
    sticker: "📹",
    website: "https://devline.ru/",
    tags: ["Производитель", "Видеонаблюдение", "Дилер"],
  },
];

function PartnerImage({
  logo,
  sticker,
  name,
}: {
  logo: string;
  sticker: string;
  name: string;
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Если путь к логотипу отсутствует — сразу показываем стикер
  if (!logo) {
    return (
      <div className="relative w-14 h-14 rounded-xl bg-cta/10 flex items-center justify-center overflow-hidden flex-shrink-0">
        <span className="text-3xl">{sticker}</span>
      </div>
    );
  }

  return (
    <div className="relative w-14 h-14 rounded-xl bg-cta/10 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
      {/* Состояние загрузки */}
      {isImageLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-cta/10">
          <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Ошибка загрузки — показываем стикер */}
      {hasError && <span className="text-3xl">{sticker}</span>}

      {/* Изображение */}
      {!hasError && (
        <Image
          src={logo}
          alt={`Логотип ${name}`}
          fill
          sizes="56px"
          className={`
            object-contain p-2 transition-opacity duration-300
            ${isImageLoading ? "opacity-0" : "opacity-100"}
          `}
          onLoad={() => setIsImageLoading(false)}
          onError={() => {
            setIsImageLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}

function PartnerCard({ partner }: { partner: (typeof partnersData)[0] }) {
  return (
    <div className="group bg-surface rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:border-cta/30">
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-4">
          <PartnerImage
            logo={partner.logo}
            sticker={partner.sticker}
            name={partner.name}
          />
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-copy-primary mb-1">
              {partner.name}
            </h3>
            {partner.shortName !== partner.name && (
              <p className="text-sm text-copy-secondary">{partner.shortName}</p>
            )}
          </div>
        </div>

        <p className="text-copy-secondary mb-4 leading-relaxed">
          {partner.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {partner.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-surface-alt rounded-md text-xs text-copy-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={partner.website}
          className="inline-flex items-center text-cta font-medium hover:text-cta-active transition-colors"
        >
          Узнать больше
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

function PartnersContent() {
  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
            Партнёры
          </h1>
          <p className="text-lg text-copy-secondary max-w-3xl mx-auto">
            На этой странице представлены компании, с которыми мы тесно
            взаимодействуем и совместно с которыми выполняем сложные проекты.
          </p>
        </div>

        {/* Сетка партнёров */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {partnersData.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        {/* Дополнительная информация / контакты */}
        <div className="bg-cta/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-copy-primary mb-3">
            Станьте нашим партнёром
          </h2>
          <p className="text-copy-secondary max-w-2xl mx-auto mb-6">
            Если вы разделяете наши ценности и хотите совместно развивать
            технологии безопасности и автоматизации — свяжитесь с нами.
          </p>
          <a
            href="/contacts"
            className="inline-block px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
          >
            Связаться с отделом партнёрств
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta mx-auto"></div>
              <p className="mt-4 text-copy-secondary">Загрузка партнёров...</p>
            </div>
          </div>
        </div>
      }
    >
      <PartnersContent />
    </Suspense>
  );
}
