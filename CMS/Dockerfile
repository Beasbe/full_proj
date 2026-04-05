FROM php:8.3-fpm

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libpq-dev \
    default-mysql-client \
    libicu-dev   # ← добавить эту строку

# Очистка кэша
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка PHP расширений
RUN docker-php-ext-install mbstring exif pcntl bcmath gd zip sockets intl

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Создание пользователя для правильных прав
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www
USER www

EXPOSE 9000
CMD ["php-fpm"]
