FROM php:8.3-fpm

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
    libicu-dev \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        sockets \
        intl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN groupadd -g 1000 www \
    && useradd -u 1000 -ms /bin/bash -g www www

RUN chown -R www:www /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database

USER www

EXPOSE 9000
CMD ["php-fpm"]
