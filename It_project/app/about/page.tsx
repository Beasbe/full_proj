import React from "react";

function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-copy-primary">
          О компании
        </h1>

        <div className="space-y-8">
          <section className="bg-card border border-border rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-copy-primary">
              Наша миссия
            </h2>
            <p className="text-copy-secondary leading-relaxed">
              Мы - команда профессионалов, занимающаяся разработкой IT-решений
              для современных бизнес-задач. Наша цель - создавать инновационные
              продукты, которые упрощают жизнь пользователей и помогают
              компаниям достигать новых высот в цифровую эпоху.
            </p>
          </section>

          <section className="bg-card border border-border rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-copy-primary">
              Наша история
            </h2>
            <p className="text-copy-secondary leading-relaxed">
              Компания ЗАО «АйТи Проект» основана в феврале 2009 года. Как
              подразделение компании ЗАО «Лайт Коммуникейшн Калуга» наша
              компания существует на калужском рынке с 2003 года. В 2009 году
              проектный бизнес окончательно сформировался в отдельное
              направление деятельности со своими целями, задачами, направлениями
              развития, со своим персоналом и оборудованием. В результате была
              создана компания «IT Project», как отражение уже сложившейся
              инфраструктуры. В настоящий момент мы продолжаем тесное
              сотрудничество с компанией «Lightcom» и, зачастую, совместно
              реализуем сложные комплексные проекты по автоматизации и
              построению IT инфраструктуры для предприятий и организаций.
            </p>
          </section>

          <section className="bg-card border border-border rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-copy-primary">
              Наши ценности
            </h2>
            <ul className="space-y-3 text-copy-secondary">
              <li className="flex items-start">
                <span className="text-cta mr-2">✓</span>
                <span>
                  <strong className="text-copy-primary">Уверенность :</strong>{" "}
                  Мы уверены в своих силах и готовы учиться новому
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cta mr-2">✓</span>
                <span>
                  <strong className="text-copy-primary">Инновации:</strong>{" "}
                  Постоянное внедрение новых технологий
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cta mr-2">✓</span>
                <span>
                  <strong className="text-copy-primary">Надежность:</strong>{" "}
                  Долгосрочная поддержка и сопровождение
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cta mr-2">✓</span>
                <span>
                  <strong className="text-copy-primary">Прозрачность:</strong>{" "}
                  Четкие сроки, бюджет и коммуникация
                </span>
              </li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-copy-primary">
              Наша команда
            </h2>
            <p className="text-copy-secondary leading-relaxed">
              В нашей команде работают высококвалифицированные специалисты:
              разработчики, дизайнеры, менеджеры проектов и тестировщики. Каждый
              член команды - эксперт в своей области.
            </p>
          </section>

          <section className="bg-card border border-border rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-copy-primary">
              Контакты
            </h2>
            <div className="space-y-3 text-copy-secondary">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-cta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Email: zakaz@lc-kaluga.ru</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-cta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Телефон: +7 (4842) 77-00-44</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 text-cta mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Адрес: г. Калуга, Калужского Ополчения, 2, оф.10</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
