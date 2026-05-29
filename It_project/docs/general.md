# Общая документация

## Обзор

Это веб-приложение на Next.js для "Пятилетка Tech Solutions". Оно служит сайтом компании с разделами, такими как Hero (введение), Services, Projects, Partners и Contact Form. Сайт разработан с современными элементами UI, анимациями и фокусом на технологические инновации.

Проект создан с помощью create-next-app и включает страницы для главной, about, news и projects. Он использует Tailwind CSS для стилизации, иконки Lucide и другие библиотеки на базе React.

## Структура проекта

- **app/**: Содержит страницы и layouts Next.js.
  - `layout.tsx`: Корневой layout приложения.
  - `page.tsx`: Главная страница, импортирующая компоненты как Hero, Services, Projects, Partners и ContactForm.
  - Поддиректории: `about/`, `news/`, `projects/` для дополнительных страниц.
  - `globals.css`: Глобальные стили.

- **src/**: Директория исходного кода.
  - `components/`: Повторно используемые React-компоненты (например, Hero.tsx с анимациями и эффектами наведения).
  - `data/`: Файлы данных (если есть).
  - `hooks/`: Пользовательские React-хуки.
  - `lib/`: Утилиты.
  - `style/`: Дополнительные стили.
  - `types/`: Определения типов TypeScript.

- **public/**: Статические ассеты, такие как изображения и шрифты.

- **Другие файлы**:
  - `package.json`: Зависимости и скрипты (например, dev, build, deploy на GitHub Pages).
  - `next.config.ts`: Конфигурация Next.js.
  - `tsconfig.json`: Конфигурация TypeScript.
  - `tailwind.config.ts`: Конфигурация Tailwind CSS.
  - `postcss.config.mjs`: Настройка PostCSS.
  - `eslint.config.mjs`: Правила ESLint.
  - `README.md`: Базовое руководство по запуску.

## Используемые технологии

- **Фреймворк**: Next.js (^14.1.6 или позже, но package.json показывает ^16.1.6 – примечание: проверьте версию).
- **Язык**: TypeScript.
- **UI/Стилизация**: Tailwind CSS (^3.4.1, но package.json показывает ^4.1.18), PostCSS, Autoprefixer.
- **Компоненты**: React (^18.2.0, package.json ^19.2.0), React DOM, Lucide React для иконок, React Icons, Next Themes для тем.
- **Деплой**: Настроено для GitHub Pages с пакетом gh-pages.
- **Инструменты разработки**: ESLint, типы Node и т.д.

## Настройка и запуск

Следуйте README:
- Установка зависимостей: `yarn install` (предполагая Yarn из yarn.lock).
- Запуск dev-сервера: `yarn dev`.
- Сборка: `yarn build`.
- Деплой на GitHub Pages: `yarn deploy:gh`.

## Дополнительные замечания

Эта общая документация предоставляет обзор. Обратитесь к конкретным документам для scopes, API, deployment, testing и т.д.
