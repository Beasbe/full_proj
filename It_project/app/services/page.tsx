"use client";

import Link from "next/link";
import React from "react";

const servicesData = [
  {
    id: "design",
    title: "Проектирование",
    shortDescription:
      "Разработка технических решений и проектной документации для систем безопасности, СКУД, видеонаблюдения и слаботочных сетей.",
    fullDescription:
      "Мы создаём детальные проекты любой сложности: от одноквартирных умных домов до крупных промышленных объектов. В работе используем актуальные нормативы и современное ПО.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 6h14M5 9h14M5 13h14M5 17h14"
        />
      </svg>
    ),
    tags: ["Проектная документация", "3D-моделирование", "Сметы", "Экспертиза"],
    link: "/services/design",
    gradient: "from-blue-500/10 to-cyan-500/10",
    buttonText: "Подробнее о проектировании",
  },
  {
    id: "consulting",
    title: "Консалтинг",
    shortDescription:
      "Аудит существующих систем, технико-экономическое обоснование, подбор оборудования и помощь в выборе оптимальных решений.",
    fullDescription:
      "Наши инженеры проведут независимую оценку, помогут сформулировать техническое задание, выберут надёжных поставщиков и проверят готовые проекты на соответствие стандартам.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    tags: ["Аудит", "ТЭО", "Подбор оборудования", "Техническое задание"],
    link: "/services/consulting",
    gradient: "from-purple-500/10 to-pink-500/10",
    buttonText: "Подробнее о консалтинге",
  },
  {
    id: "support",
    title: "Техническая поддержка",
    shortDescription:
      "Сервисное обслуживание, пусконаладка, мониторинг и оперативное устранение неисправностей систем безопасности и автоматизации.",
    fullDescription:
      "Обеспечим бесперебойную работу вашего оборудования: круглосуточный мониторинг, выезд инженеров на объект, плановые проверки и экстренное восстановление.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18.364 5.636L16.95 7.05M18.364 5.636a9 9 0 11-12.728 12.728M18.364 5.636L12 12m6.364 6.364l-1.414-1.414M12 12L5.636 5.636m0 0a9 9 0 0112.728 12.728"
        />
      </svg>
    ),
    tags: ["24/7 мониторинг", "Выезд инженеров", "Плановые проверки", "Ремонт"],
    link: "/services/support",
    gradient: "from-green-500/10 to-emerald-500/10",
    buttonText: "Подробнее о поддержке",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
            Наши услуги
          </h1>
          <p className="text-lg text-copy-secondary max-w-3xl mx-auto">
            Комплексные решения в области проектирования, консалтинга и
            технической поддержки. Мы помогаем бизнесу быть безопасным и
            эффективным.
          </p>
        </div>

        {/* Карточки услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group bg-surface rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:border-cta/30 flex flex-col h-full"
            >
              <div
                className={`p-6 bg-gradient-to-br ${service.gradient} border-b border-border`}
              >
                <div className="text-cta mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold text-copy-primary mb-2">
                  {service.title}
                </h2>
                <p className="text-copy-secondary text-sm">
                  {service.shortDescription}
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-copy-secondary mb-4 leading-relaxed">
                  {service.fullDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface-alt rounded-md text-xs text-copy-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={service.link}
                  className="mt-auto inline-flex items-center text-cta font-medium hover:text-cta-active transition-colors group/link"
                >
                  {service.buttonText}
                  <svg
                    className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
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
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительный блок: почему мы? / преимущества */}
        <div className="bg-cta/5 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-semibold text-copy-primary text-center mb-8">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-cta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-copy-primary">
                Опыт более 10 лет
              </h3>
              <p className="text-sm text-copy-secondary">
                Более 500 реализованных проектов
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-cta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-copy-primary">
                Штатные инженеры
              </h3>
              <p className="text-sm text-copy-secondary">
                Сертифицированные специалисты
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-cta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-copy-primary">
                Собственный склад
              </h3>
              <p className="text-sm text-copy-secondary">
                Быстрая поставка оборудования
              </p>
            </div>
          </div>
        </div>

        {/* Призыв к действию / контакты */}
        <div className="bg-surface rounded-xl shadow-md p-8 text-center border border-border">
          <h2 className="text-2xl font-semibold text-copy-primary mb-3">
            Нужна консультация?
          </h2>
          <p className="text-copy-secondary max-w-2xl mx-auto mb-6">
            Свяжитесь с нами, и мы подберём оптимальное решение для вашего
            бизнеса.
          </p>
          <Link
            href="/contacts"
            className="inline-block px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}
