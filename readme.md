#  Руководство по запуску проекта (Laravel + Nginx + Next.js + Filament CMS)

Данное руководство описывает процесс локального развертывания стека: **Laravel (бэкенд + Filament)**, **Nginx** и **Next.js (фронтенд)**.

##  Требования
- Docker & Docker Compose (v2+)
- Git (опционально)
- Доступ к терминалу с правами на запись в директорию проекта

##  Структура проекта
```
./
├── docker-compose.yml      # Конфигурация контейнеров
├── CMS/                    # Laravel + Filament (бэкенд)
│   ├── Dockerfile
│   ├── Docker/
│   └── ...                 # Настройки php и Nginx сервера
│   ├── database/           # SQLite база данных
│   └── ...                 # Исходный код Laravel
└── It_project/             # Next.js (фронтенд)
    ├── Dockerfile
    └── ...                 # Исходный код Next.js
```

---

##  Пошаговый запуск
```bash
git clone https://github.com/Beasbe/full_proj.git
cd full_proj
git clone https://github.com/Beasbe/It_project.git
```
### 1. Подготовка `.env` и генерация `APP_KEY`
Убедитесь, что в папке `./CMS` существует файл `.env`. Если его нет, создайте его на основе `.env.example`:
```bash
cp ./CMS/.env.example ./CMS/.env
cp ./It_project/env.local.example ./It_project/.env.local # не работает
```
В /It_project/.env.local надо вписать данные для автоматической отправки пиьма на почту после заполнения формы
Запустите контейнеры в фоновом режиме:
```bash
docker compose up -d --build
```

Сгенерируйте ключ приложения через Artisan (ключ автоматически запишется в `./CMS/.env`):
```bash
docker compose exec app composer install
docker compose exec app php artisan key:generate
```
>  Ключ будет сохранён в формате `base64:...` и автоматически подтягиваться при перезапуске.

### 2. Настройка базы данных и миграции
Так как используется SQLite, убедитесь, что файл базы данных существует и имеет права на запись:
```bash
touch ./CMS/database/database.sqlite
chmod 666 ./CMS/database/database.sqlite
```

Примените миграции и заполните тестовыми данными:
```bash
docker compose exec app php artisan migrate
```

### 3. Создание администратора Filament
Для входа в админ-панель создайте первого пользователя:
```bash
docker compose exec app php artisan make:filament-user
```
Следуйте инструкциям в терминале (введите имя, email, пароль).

---

##  Доступ к приложению
| Сервис          | URL                          | Примечание                     |
|-----------------|------------------------------|--------------------------------|
| Фронтенд Next.js| `http://localhost:3000`      | Основной интерфейс             |
| Бэкенд / Filament| `http://localhost:8080/admin`| Панель администратора          |
| API             | `http://localhost:8080/api/*`| Доступно для фронтенда         |

---

##  Примеры работы с пользователями в Filament CMS

### Создание пользователя через CLI (Artisan)
```bash
# Создать обычного пользователя
docker compose exec app php artisan tinker
```
```php
\App\Models\User::create([
    'name' => 'Иван Иванов',
    'email' => 'ivan@example.com',
    'password' => secret123,
]);
exit
```


##  Изменение логотипа
