# Руководство по запуску проекта

Простой запуск стека: **Laravel + Filament CMS + Next.js + Nginx + MySQL** через Docker.

## Быстрый старт

### Для Linux / macOS / Git Bash на Windows

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Beasbe/full_proj.git

# 2. Перейдите в папку проекта
cd full_proj

# 3. Запустите автоматическую настройку
chmod +x setup.sh
./setup.sh

# 4. Заполните данные для отправки почты
# Откройте файл It_project/.env.local и укажите SMTP-настройки:
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USERNAME=your_email@example.com
# SMTP_PASSWORD=your_password
```

### Для Windows (PowerShell)

```powershell
# 1. Клонируйте репозиторий
git clone https://github.com/Beasbe/full_proj.git

# 2. Перейдите в папку проекта
cd full_proj

# 3. Запустите скрипт настройки
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1

# 4. Заполните данные для отправки почты в It_project\.env.local
```

---

## Что делает скрипт автоматически

1.  Проверяет наличие зависимостей: Git, Docker, Docker Compose v2+
2.  Клонирует фронтенд-репозиторий `It_project` (если отсутствует)
3.  Создаёт файлы `.env` из примеров
4.  Собирает и запускает Docker-контейнеры
5.  Устанавливает PHP-зависимости через Composer
6.  Генерирует `APP_KEY` для Laravel
7.  Применяет миграции базы данных
8.  Запускает интерактивное создание администратора Filament

---

## Доступ к приложению после запуска

| Сервис | URL | Описание |
|--------|-----|----------|
| Фронтенд | `http://localhost:3000` | Основное приложение на Next.js |
| Админ-панель | `http://localhost:8080/admin` | Filament CMS для управления контентом |
| API | `http://localhost:8080/api` | Бэкенд-эндпоинты для фронтенда |

---

## Полезные команды

```bash
# Просмотр логов
docker compose logs -f app          # Laravel
docker compose logs -f frontend     # Next.js
docker compose logs -f db           # База данных

# Вход в контейнер Laravel
docker compose exec app bash

# Консоль Laravel (Tinker)
docker compose exec app php artisan tinker

# Очистка кеша
docker compose exec app php artisan config:clear
docker compose exec app php artisan cache:clear

# Остановка проекта
docker compose down

# Полная очистка (с удалением данных БД)
docker compose down -v
```

---

## Требования

-   **Git**: https://git-scm.com/downloads
-   **Docker Desktop** (с Docker Compose v2+): https://docs.docker.com/get-docker/
-   На Windows рекомендуется использовать **WSL2** бэкенд в настройках Docker Desktop

---


## Примеры работы с пользователями

### Создание пользователя через админ-панель
1.  Откройте `http://localhost:8080/admin`
2.  Войдите под учётными данными, созданными при установке
3.  Перейдите в раздел **Users** → **New User**
4.  Заполните форму и нажмите **Create**

### Создание пользователя через консоль
```bash
docker compose exec app php artisan tinker
```
```php
\App\Models\User::create([
    'name' => 'Иван Иванов',
    'email' => 'ivan@example.com',
    'password' => bcrypt('secret123'),
]);
exit
```

### Создание администратора через CLI
```bash
docker compose exec app php artisan make:filament-user
```

---

> **Примечание**: Все данные базы данных хранятся в Docker-томе. При выполнении `docker compose down -v` данные будут удалены. Для сохранения данных используйте `docker compose down` (без флага `-v`).
