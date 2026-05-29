"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = async () => {
    if (!mounted || isAnimating) return;

    setIsAnimating(true);

    // Проверяем поддержку View Transitions API
    const isViewTransitionsSupported =
      typeof document !== "undefined" && "startViewTransition" in document;

    if (isViewTransitionsSupported) {
      try {
        // Запускаем анимацию перехода
        const transition = document.startViewTransition(() => {
          setTheme(isDark ? "light" : "dark");
        });

        // Ждем завершения анимации
        await transition.finished;
      } catch (error) {
        console.error("View Transition failed:", error);
        // Fallback если что-то пошло не так
        setTheme(isDark ? "light" : "dark");
      }
    } else {
      // Fallback для браузеров без поддержки View Transitions API
      setTheme(isDark ? "light" : "dark");
    }

    // Сбрасываем состояние анимации
    setTimeout(() => setIsAnimating(false), 500);
  };

  const navItems = [
    { name: "Наши работы", href: "/projects" },
    { name: "Партнёры", href: "/partners" },
    { name: "Новости", href: "/news" },
    { name: "О компании", href: "/about" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <header className="z-50 bg-card text-copy-primary shadow-md transition-colors duration-500">
      <div className="w-full justify-between px-4 py-4">
        {/* Для десктопа - отдельная структура */}
        <div className="hidden md:flex items-center justify-between m-3">
          {/* Логотип с анимацией */}
          {/* Логотип с анимацией и ссылкой на главную */}
          <Link
            href="/"
            className="flex items-center space-x-2 group cursor-pointer no-underline"
          >
            <div className="h-17 w-18 bg-white rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              <img src="/globe.svg" alt="Globe" className="w-18 h-18" />
            </div>
            <span className="text-xl font-bold text-copy-primary transition-all duration-300 group-hover:text-cta">
              АйТи ПРОЕКТ
            </span>
          </Link>

          {/* Навигация с отступами */}
          <nav
            role="navigation"
            className="flex text-2xl items-center gap-8 space-x-10 m-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className="text-sm text-copy-secondary select-none hover:text-cta transition-all duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cta transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Телефон и почта */}
          <div className="flex flex-col items-start space-y-1">
            <a
              href="tel:+74842770044"
              className="flex items-center gap-2 text-sm hover:text-cta transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+7 (4842) 77-00-44</span>
            </a>

            <a
              href="mailto:zakaz@lc-kaluga.ru"
              className="flex items-center gap-2 text-sm hover:text-cta transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>zakaz@lc-kaluga.ru</span>
            </a>
          </div>

          {/* Переключатель темы с анимацией */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              disabled={isAnimating}
              aria-label={
                isDark
                  ? "Переключить на светлую тему"
                  : "Переключить на темную тему"
              }
              className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md ${
                isAnimating ? "animate-theme-switch" : ""
              }`}
            >
              <div className="relative w-5 h-5">
                {isDark ? (
                  <Sun
                    className={`w-5 h-5 text-yellow-500 ${
                      isAnimating ? "animate-pulse" : ""
                    }`}
                  />
                ) : (
                  <Moon
                    className={`w-5 h-5 text-gray-700 dark:text-gray-300 ${
                      isAnimating ? "animate-pulse" : ""
                    }`}
                  />
                )}
              </div>
              <div
                className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)",
                }}
              ></div>
            </button>
          </div>
        </div>

        {/* Для мобилки - отдельная структура */}
        <div className="flex items-center justify-between md:hidden">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2 no-underline">
            <div className="h-10 w-10 bg-cta rounded flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <span className="text-cta-text font-bold text-lg">IT</span>
            </div>
            <span className="text-xl font-bold text-copy-primary">
              АйТи ПРОЕКТ
            </span>
          </Link>

          {/* Переключатель темы и кнопка меню */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              disabled={isAnimating}
              aria-label={isDark ? "Светлая тема" : "Темная тема"}
              className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md ${
                isAnimating ? "animate-theme-switch" : ""
              }`}
            >
              {isDark ? (
                <Sun
                  className={`w-5 h-5 text-yellow-500 ${
                    isAnimating ? "animate-pulse" : ""
                  }`}
                />
              ) : (
                <Moon
                  className={`w-5 h-5 text-gray-700 dark:text-gray-300 ${
                    isAnimating ? "animate-pulse" : ""
                  }`}
                />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню с анимацией */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4 animate-slideDown">
            <nav role="navigation" className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={false}
                  className="py-3 px-4 text-copy-secondary hover:text-cta hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
