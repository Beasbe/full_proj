#!/bin/bash
set -e

# Проверка зависимостей
check_dependencies() {
    echo "Проверка необходимых зависимостей..."

    # Проверка Docker
    if ! command -v docker &> /dev/null; then
        echo "Ошибка: Docker не установлен."
        echo "Установите Docker: https://docs.docker.com/get-docker/"
        exit 1
    fi
    echo "Docker: $(docker --version)"

    # Проверка Docker Compose v2+
    if ! docker compose version &> /dev/null; then
        echo "Ошибка: Docker Compose v2+ не установлен или не найден."
        echo "Убедитесь, что Docker Desktop обновлён или установите Compose V2: https://docs.docker.com/compose/install/"
        exit 1
    fi

    # Проверка версии Compose (должна быть 2.x)
    COMPOSE_VERSION=$(docker compose version --short 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$COMPOSE_VERSION" -lt 2 ]; then
        echo "Ошибка: Требуется Docker Compose v2 или выше. Найдена версия 1.x"
        echo "Обновите Docker Compose: https://docs.docker.com/compose/install/linux/"
        exit 1
    fi
    echo "Docker Compose: $(docker compose version --short)"

    # Проверка, что Docker Daemon запущен
    if ! docker info &> /dev/null; then
        echo "Ошибка: Docker Daemon не запущен."
        echo "Запустите Docker Desktop или выполните: sudo systemctl start docker"
        exit 1
    fi
    echo "Docker Daemon: активен"

    echo "Все зависимости установлены корректно."
    echo "========================================================="
}

# Запуск проверки
check_dependencies

echo "Запуск настройки проекта (Laravel + Filament + Next.js)"
echo "========================================================="

# 1. Клонируем фронтенд-репозиторий (если ещё не клонирован)
if [ ! -f "It_project/package.json" ] || [ ! -f "It_project/Dockerfile" ]; then
    echo "Клонирование фронтенд-репозитория..."
    # Удаляем неполную папку, если она есть
    if [ -d "It_project" ]; then
        rm -rf It_project
    fi
    git clone https://github.com/Beasbe/It_project.git
else
    echo "Фронтенд-репозиторий уже загружен, пропускаем клонирование"
fi
# 2. Подготовка .env файлов
echo "Настройка конфигурации..."

# Laravel CMS
if [ ! -f "CMS/.env" ] && [ -f "CMS/.env.example" ]; then
    cp CMS/.env.example CMS/.env
    echo "CMS/.env создан"
fi

# Next.js frontend
if [ ! -f "It_project/.env.local" ] && [ -f "It_project/.env.local.example" ]; then
    cp It_project/.env.local.example It_project/.env.local
    echo "It_project/.env.local создан"
    echo "Внимание: Не забудьте заполнить SMTP-данные в It_project/.env.local для отправки писем"
fi

# 3. Запуск Docker
echo "Сборка и запуск контейнеров..."
docker compose up -d --build

# 4. Ожидание готовности БД и контейнеров
echo "Ожидание готовности сервисов (15 сек)..."
sleep 15

# 5. Установка зависимостей и настройка Laravel
echo "Настройка Laravel..."
docker compose exec app composer install --no-interaction
docker compose exec app php artisan config:clear
docker compose exec app php artisan key:generate --no-interaction

# 6. Миграции
echo "Применение миграций..."
docker compose exec app php artisan migrate

# 7. Создание админа (интерактивно)
echo "Создание администратора Filament..."
echo "Следуйте подсказкам в терминале для ввода имени, email и пароля"
docker compose exec app php artisan make:filament-user

# 8. Финал
echo ""
echo "Настройка завершена!"
echo "========================================================="
echo "Фронтенд:     http://localhost:3000"
echo "Админ-панель:  http://localhost:8080/admin"
echo "API:          http://localhost:8080/api"
echo ""
echo "Полезные команды:"
echo "  docker compose logs -f app          # логи Laravel"
echo "  docker compose exec app php artisan tinker  # консоль Laravel"
echo "  docker compose down                 # остановка контейнеров"
