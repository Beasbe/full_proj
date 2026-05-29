"use client";
import React from "react";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const Footer = () => {
  const navigationLinks = [
    { name: "Каталог решений", href: "/projects" },
    { name: "О компании", href: "/about" },
    { name: "Новости", href: "/news" },
    { name: "Контакты", href: "/contacts" },
  ];

  const contactInfo = {
    address: "г. Калуга, Калужского Ополчения, 2, оф.10",
    phone: "+7 (4842) 77-00-44",
    email: "zakaz@lc-kaluga.ru",
    workingHours: "Пн-Пт: 9:00-18:00",
  };

  return (
    <footer className="bg-background border-t border-default border-border transition-theme">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Логотип и название */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cta rounded-lg flex items-center justify-center">
                <span className="text-cta-text font-bold text-lg">IT</span>
              </div>
              <h2 className="text-xl font-bold text-copy-primary">
                АйТи ПРОЕКТ
              </h2>
            </div>
            <p className="text-copy-secondary text-sm leading-relaxed">
              Проектирование зданий и сооружений на передовой информационных
              технологий
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-copy-primary font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-copy-secondary hover:text-cta text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-copy-primary font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/design"
                  className="text-copy-secondary hover:text-cta text-sm transition-colors duration-200"
                >
                  Проектирование
                </Link>
              </li>
              <li>
                <Link
                  href="/services/consulting"
                  className="text-copy-secondary hover:text-cta text-sm transition-colors duration-200"
                >
                  Консалтинг
                </Link>
              </li>
              <li>
                <Link
                  href="/services/support"
                  className="text-copy-secondary hover:text-cta text-sm transition-colors duration-200"
                >
                  Техническая поддержка
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="lg:col-span-1">
            <h3 className="text-copy-primary font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div>
                <p className="text-copy-secondary text-xs mb-1">Адрес</p>
                <p className="text-copy-primary text-sm">
                  {contactInfo.address}
                </p>
              </div>
              <div>
                <p className="text-copy-secondary text-xs mb-1">Телефон</p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                  className="text-copy-primary hover:text-cta text-sm transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <p className="text-copy-secondary text-xs mb-1">Email</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-copy-primary hover:text-cta text-sm transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <p className="text-copy-secondary text-xs mb-1">Режим работы</p>
                <p className="text-copy-primary text-sm">
                  {contactInfo.workingHours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-copy-secondary text-sm">
              © {currentYear} IT Project. Все права защищены.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-copy-secondary hover:text-cta text-sm transition-colors duration-200"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
