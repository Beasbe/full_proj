// app/services/consulting/page.tsx
"use client";

import Link from "next/link";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Хлебные крошки */}
        <div className="mb-6 text-sm text-copy-secondary">
          <Link href="/services" className="hover:text-cta transition-colors">
            Услуги
          </Link>
          <span className="mx-2">/</span>
          <span className="text-copy-primary">Консалтинг</span>
        </div>

        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
            Консалтинг в области безопасности и слаботочных систем
          </h1>
          <p className="text-lg text-copy-secondary max-w-3xl mx-auto">
            Независимый аудит, технико-экономическое обоснование и подбор
            оптимальных решений для вашего бизнеса. Помогаем избежать ошибок и
            лишних затрат.
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
                  <span>
                    Аудит существующих систем безопасности и слаботочных сетей
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>Технико-экономическое обоснование (ТЭО) проектов</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>
                    Помощь в составлении технического задания на проектирование
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>
                    Подбор оборудования и сравнение альтернативных решений
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>
                    Экспертиза готовых проектов на соответствие нормативам
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cta font-bold">→</span>
                  <span>Рекомендации по оптимизации бюджета и сроков</span>
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
                      Первичная консультация
                    </h3>
                    <p className="text-copy-secondary text-sm">
                      Бесплатно выясняем ваши задачи, определяем объём
                      необходимых работ и готовим коммерческое предложение.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0 text-cta font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-copy-primary">
                      Исследование и анализ
                    </h3>
                    <p className="text-copy-secondary text-sm">
                      Проводим аудит существующих систем, собираем данные,
                      анализируем требования и нормативы.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0 text-cta font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-copy-primary">
                      Разработка рекомендаций
                    </h3>
                    <p className="text-copy-secondary text-sm">
                      Предоставляем отчёт с конкретными предложениями,
                      технико-экономическим обоснованием и планом действий.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0 text-cta font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-copy-primary">
                      Сопровождение
                    </h3>
                    <p className="text-copy-secondary text-sm">
                      При необходимости сопровождаем внедрение решений,
                      участвуем в переговорах с подрядчиками и поставщиками.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Блок контактов */}
          <div className="bg-surface rounded-xl shadow-md p-6 md:p-8 border border-border h-fit sticky top-8">
            <h2 className="text-2xl font-semibold text-copy-primary mb-4">
              Нужна консультация?
            </h2>
            <p className="text-copy-secondary text-sm mb-6">
              Обсудим вашу задачу, оценим текущее состояние систем или поможем
              сформулировать требования.
            </p>
            <Link
              href="/contacts"
              className="block w-full bg-cta hover:bg-cta-active text-cta-text font-semibold py-2 rounded-lg transition-colors text-center"
            >
              Связаться с консультантом
            </Link>
          </div>
        </div>

        {/* Преимущества */}
        <div className="bg-cta/5 rounded-2xl p-8 text-center mb-16">
          <h2 className="text-2xl font-semibold text-copy-primary mb-6">
            Почему доверяют нашему консалтингу
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold">Независимость</h3>
              <p className="text-sm text-copy-secondary">
                Мы не привязаны к конкретным производителям и предлагаем
                оптимальные решения.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Опытная команда</h3>
              <p className="text-sm text-copy-secondary">
                Инженеры с многолетним стажем в проектировании и эксплуатации.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Экономия бюджета</h3>
              <p className="text-sm text-copy-secondary">
                Помогаем избежать избыточных затрат и выбрать проверенное
                оборудование.
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
            Получить консультацию
          </Link>
        </div>
      </div>
    </div>
  );
}
