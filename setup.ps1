# Проверка зависимостей
function Check-Dependencies {
    Write-Host "Проверка необходимых зависимостей..."
    # Проверка Docker
    if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "Ошибка: Docker не установлен." -ForegroundColor Red
        Write-Host "Установите Docker Desktop: https://docs.docker.com/desktop/install/windows-install/" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "Docker: $(docker --version)"

    # Проверка Docker Compose v2+
    try {
        $composeVersion = docker compose version --short 2>$null
        if (!$composeVersion) {
            throw "Compose not found"
        }
        $majorVersion = $composeVersion.Split('.')[0].TrimStart('v')
        if ([int]$majorVersion -lt 2) {
            Write-Host "Ошибка: Требуется Docker Compose v2 или выше. Найдена версия $composeVersion" -ForegroundColor Red
            Write-Host "Обновите Docker Desktop: https://docs.docker.com/desktop/" -ForegroundColor Yellow
            exit 1
        }
        Write-Host "Docker Compose: $composeVersion"
    }
    catch {
        Write-Host "Ошибка: Docker Compose v2+ не установлен или не найден." -ForegroundColor Red
        Write-Host "Убедитесь, что Docker Desktop обновлён." -ForegroundColor Yellow
        exit 1
    }

    # Проверка, что Docker Daemon запущен
    try {
        docker info | Out-Null
        Write-Host "Docker Daemon: активен"
    }
    catch {
        Write-Host "Ошибка: Docker Daemon не запущен." -ForegroundColor Red
        Write-Host "Запустите Docker Desktop." -ForegroundColor Yellow
        exit 1
    }

    Write-Host "Все зависимости установлены корректно."
    Write-Host "========================================================="
}

# Запуск проверки
Check-Dependencies

Write-Host "Запуск настройки проекта (Laravel + Filament + Next.js)"
Write-Host "========================================================="

# 1. Клонируем фронтенд-репозиторий
if (!(Test-Path "It_project")) {
    Write-Host "Клонирование фронтенд-репозитория..."
    git clone https://github.com/Beasbe/It_project.git
} else {
    Write-Host "Фронтенд-репозиторий уже существует, пропускаем клонирование"
}

# 2. Подготовка .env файлов
Write-Host "Настройка конфигурации..."

# Laravel CMS
if (!(Test-Path "CMS/.env") -and (Test-Path "CMS/.env.example")) {
    Copy-Item CMS/.env.example CMS/.env
    Write-Host "CMS/.env создан"
}

# Next.js frontend
if (!(Test-Path "It_project/.env.local") -and (Test-Path "It_project/.env.local.example")) {
    Copy-Item It_project/.env.local.example It_project/.env.local
    Write-Host "It_project/.env.local создан"
    Write-Host "Внимание: Не забудьте заполнить SMTP-данные в It_project/.env.local для отправки писем"
}

# 3. Запуск Docker
Write-Host "Сборка и запуск контейнеров..."
docker compose up -d --build

# 4. Ожидание готовности
Write-Host "Ожидание готовности сервисов (15 сек)..."
Start-Sleep -Seconds 15

# 5. Установка зависимостей и настройка Laravel
Write-Host "Настройка Laravel..."
docker compose exec app composer install --no-interaction
docker compose exec app php artisan config:clear
docker compose exec app php artisan key:generate --no-interaction

# 6. Миграции
Write-Host "Применение миграций..."
docker compose exec app php artisan migrate --force --no-interaction

# 7. Создание админа
Write-Host "Создание администратора Filament..."
Write-Host "Следуйте подсказкам в терминале для ввода имени, email и пароля"
docker compose exec app php artisan make:filament-user

# 8. Финал
Write-Host ""
Write-Host "Настройка завершена!"
Write-Host "========================================================="
Write-Host "Фронтенд:     http://localhost:3000"
Write-Host "Админ-панель:  http://localhost:8080/admin"
Write-Host "API:          http://localhost:8080/api"
Write-Host ""
Write-Host "Полезные команды:"
Write-Host "  docker compose logs -f app          # логи Laravel"
Write-Host "  docker compose exec app php artisan tinker  # консоль Laravel"
Write-Host "  docker compose down                 # остановка контейнеров"
