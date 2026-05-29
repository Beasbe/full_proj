// app/services/design/page.tsx
"use client";

import Link from "next/link";

export default function DesignPage() {
  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Хлебные крошки */}
        <div className="mb-6 text-sm text-copy-secondary">
          <Link href="/services" className="hover:text-cta transition-colors">
            Услуги
          </Link>
          <span className="mx-2">/</span>
          <span className="text-copy-primary">Проектирование</span>
        </div>

        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
            Проектирование слаботочных систем
          </h1>
          <p className="text-lg text-copy-secondary max-w-3xl mx-auto">
            Разрабатываем проектную документацию любой сложности: от квартирного
            умного дома до крупных промышленных объектов.
          </p>
        </div>

        {/* Основное содержание */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface rounded-xl shadow-md p-6 md:p-8 border border-border">
              <h2 className="text-2xl font-semibold text-copy-primary mb-4">
                Что мы делаем
              </h2>
              <ul className="space-y-3 text-copy-secondary">
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>Обследование объекта и сбор исходных данных</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>
                    Разработка структурных, функциональных и принципиальных схем
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>Планы расположения оборудования и кабельных трасс</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>Составление смет и спецификаций</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>3D-визуализация и согласование с заказчиком</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>
                    Передача документации в форматах PDF, DWG и других
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl shadow-md p-6 md:p-8 border border-border">
              <h2 className="text-2xl font-semibold text-copy-primary mb-4">
                Этапы работы
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0 text-cta font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-copy-primary">
                      Консультация и ТЗ
                    </h3>
                    <p className="text-copy-secondary text-sm">
                      Бесплатно обсуждаем задачи, составляем техническое задание
                      и коммерческое предложение.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0 text-cta font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-copy-primary">
                      Проектирование
                    </h3>
                    <p className="text-copy-secondary text-sm">
                      Разрабатываем документацию, согласовываем промежуточные
                      результаты.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0 text-cta font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-copy-primary">
                      Сдача и сопровождение
                    </h3>
                    <p className="text-copy-secondary text-sm">
                      Передаём готовый проект, вносим правки при необходимости,
                      помогаем с экспертизой.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Блок контактов вместо формы */}
          <div className="bg-surface rounded-xl shadow-md p-6 md:p-8 border border-border h-fit sticky top-8">
            <h2 className="text-2xl font-semibold text-copy-primary mb-4">
              Нужен проект?
            </h2>
            <p className="text-copy-secondary text-sm mb-6">
              Оставьте заявку на консультацию, и мы рассчитаем стоимость и сроки
              проектирования.
            </p>
            <Link
              href="/contacts"
              className="block w-full bg-cta hover:bg-cta-active text-cta-text font-semibold py-2 rounded-lg transition-colors text-center"
            >
              Связаться с инженером
            </Link>
          </div>
        </div>

        {/* Преимущества */}
        <div className="bg-cta/5 rounded-2xl p-8 text-center mb-16">
          <h2 className="text-2xl font-semibold text-copy-primary mb-6">
            Почему заказывают проект у нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold">Соответствие ГОСТ</h3>
              <p className="text-sm text-copy-secondary">
                Все проекты проходят проверку на соответствие нормативам.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Соблюдение сроков</h3>
              <p className="text-sm text-copy-secondary">
                Чёткое планирование и контроль на каждом этапе.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Оптимальные решения</h3>
              <p className="text-sm text-copy-secondary">
                Снижаем стоимость монтажа без потери качества.
              </p>
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="text-center">
          <Link
            href="/contacts"
            className="inline-block px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
          >
            Связаться с инженером
          </Link>
        </div>
      </div>
    </div>
  );
}
