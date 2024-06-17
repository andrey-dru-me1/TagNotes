FROM php:fpm

RUN apt update \
    && apt upgrade -y \
    && apt install -y libpq-dev libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pgsql pdo_pgsql intl
