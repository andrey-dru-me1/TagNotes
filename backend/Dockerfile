FROM php:fpm

RUN apt update \
    && apt install -y libpq-dev \
    && docker-php-ext-install pgsql \
    && docker-php-ext-install pdo_pgsql
