FROM php:8.2-apache

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_CACHE_DIR=/tmp/composer-cache

RUN apt-get update \
    && apt-get install -y --no-install-recommends git unzip libzip-dev libicu-dev libpng-dev libonig-dev libxml2-dev libcurl4-openssl-dev \
    && docker-php-ext-install bcmath curl exif gd intl mbstring mysqli opcache pcntl pdo_mysql xml zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN printf '%s\n' \
    'Alias /admin-build/ /var/www/html/frontend/admin/dist/' \
    '<Directory /var/www/html/frontend/admin/dist/>' \
    '    Options FollowSymLinks' \
    '    AllowOverride None' \
    '    Require all granted' \
    '</Directory>' \
    'Alias /user-build/ /var/www/html/frontend/user/dist/' \
    '<Directory /var/www/html/frontend/user/dist/>' \
    '    Options FollowSymLinks' \
    '    AllowOverride None' \
    '    Require all granted' \
    '</Directory>' \
    > /etc/apache2/conf-available/v2board-admin-build.conf \
    && a2enconf v2board-admin-build

WORKDIR /var/www/html
COPY docker/entrypoint.sh /usr/local/bin/v2board-entrypoint
RUN chmod +x /usr/local/bin/v2board-entrypoint

ENTRYPOINT ["v2board-entrypoint"]
CMD ["apache2-foreground"]
