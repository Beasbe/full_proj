// app/services/support/page.tsx
"use client";

import Link from "next/link";

const tariffPlans = [
  {
    name: "Базовый",
    price: "от 5 000 ₽/мес",
    features: [
      "Удалённый мониторинг 24/7",
      "Реагирование на аварии в рабочее время",
      "Удалённое устранение до 80% неисправностей",
      "Отчётность по инцидентам",
    ],
    recommended: false,
  },
  {
    name: "Стандарт",
    price: "от 15 000 ₽/мес",
    features: [
      "Всё из Базового",
      "Выезд инженера до 2 раз в месяц",
      "Плановые профилактические работы",
      "Приоритетная обработка заявок",
    ],
    recommended: true,
  },
  {
    name: "Премиум",
    price: "от 30 000 ₽/мес",
    features: [
      "Всё из Стандарта",
      "Неограниченный выезд инженеров",
      "Замена оборудования за наш счёт (в пределах гарантии)",
      "Персональный менеджер",
    ],
    recommended: false,
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Хлебные крошки */}
        <div className="mb-6 text-sm text-copy-secondary">
          <Link href="/services" className="hover:text-cta transition-colors">
            Услуги
          </Link>
          <span className="mx-2">/</span>
          <span className="text-copy-primary">Техническая поддержка</span>
        </div>

        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
            Техническая поддержка и сервис
          </h1>
          <p className="text-lg text-copy-secondary max-w-3xl mx-auto">
            Обеспечим бесперебойную работу систем безопасности, СКУД и
            слаботочных сетей. Круглосуточный мониторинг и оперативный выезд.
          </p>
        </div>

        {/* Особенности поддержки (без эмодзи) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-surface rounded-xl shadow-md p-6 text-center border border-border">
            <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-cta font-bold text-sm">24/7</span>
            </div>
            <h3 className="font-semibold text-copy-primary">
              Реагирование 24/7
            </h3>
            <p className="text-copy-secondary text-sm">
              Аварийные заявки принимаются круглосуточно.
            </p>
          </div>
          <div className="bg-surface rounded-xl shadow-md p-6 text-center border border-border">
            <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-cta font-bold text-sm">2ч</span>
            </div>
            <h3 className="font-semibold text-copy-primary">Выезд за 2 часа</h3>
            <p className="text-copy-secondary text-sm">
              Срочный выезд инженера по Калуге.
            </p>
          </div>
          <div className="bg-surface rounded-xl shadow-md p-6 text-center border border-border">
            <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-cta font-bold text-sm">Склад</span>
            </div>
            <h3 className="font-semibold text-copy-primary">Склад запчастей</h3>
            <p className="text-copy-secondary text-sm">
              Быстрая замена вышедшего из строя оборудования.
            </p>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="text-center">
          <Link
            href="/contacts"
            className="inline-block px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
          >
            Связаться с отделом сервиса
          </Link>
        </div>
      </div>
    </div>
  );
}
