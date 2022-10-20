FROM php:7.4.27-apache-buster AS level0_deps

COPY data/install-composer.sh /tmp
COPY data/instantclient-basic-linux.x64-19.5.0.0.0dbru.zip /tmp
COPY data/instantclient-sdk-linux.x64-19.5.0.0.0dbru.zip /tmp

RUN set -eux \
    && apt-get update \
    && apt-get install -y --no-install-recommends wget unzip libaio1 \
    \
    && /tmp/install-composer.sh \
    && rm /tmp/install-composer.sh \
    \
    && mkdir /opt/oracle \
    && cd /opt/oracle \
    && unzip /tmp/instantclient-basic-linux.x64-19.5.0.0.0dbru.zip \
    && unzip /tmp/instantclient-sdk-linux.x64-19.5.0.0.0dbru.zip \
    && rm /tmp/instantclient-basic-linux.x64-19.5.0.0.0dbru.zip \
    && rm /tmp/instantclient-sdk-linux.x64-19.5.0.0.0dbru.zip \
    \
    && rm -rf /var/lib/apt/lists/*


FROM php:7.4.27-apache-buster AS base

COPY core/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY --from=level0_deps /usr/bin/composer /usr/bin
COPY --from=level0_deps /opt/oracle /opt/oracle

RUN set -eux \
    && a2enmod rewrite \
    && usermod -u 1000 www-data && groupmod -g 1000 www-data \
    \
    && apt-get update \
    \
    && apt-get install -y --no-install-recommends gnupg apt-transport-https \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && apt-get install -y unixodbc-dev \
    && docker-php-source extract \
    && pecl install sqlsrv-5.9.0 pdo_sqlsrv-5.9.0 \
    && docker-php-ext-enable --ini-name 30-sqlsrv.ini sqlsrv \
    && docker-php-ext-enable --ini-name 35-pdo_sqlsrv.ini pdo_sqlsrv \
    && docker-php-source delete \
    \
    && apt-get install -y --no-install-recommends libaio1 \
    && echo /opt/oracle/instantclient_19_5 > /etc/ld.so.conf.d/oracle-instantclient.conf \
    && ldconfig \
    && docker-php-source extract \
    && docker-php-ext-configure oci8 --with-oci8=instantclient,/opt/oracle/instantclient_19_5 \
    && docker-php-ext-install oci8  \
    && docker-php-source delete \
    \
    && docker-php-source extract \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql \
    && docker-php-source delete \
    \
    && apt-get install -y --no-install-recommends libzip-dev zip unzip \
    && docker-php-ext-install zip \
    \
    && apt-get install -y libwebp-dev libjpeg62-turbo-dev libpng-dev libxpm-dev libfreetype6-dev zlib1g-dev \
    && docker-php-source extract \
    && docker-php-ext-configure gd --with-webp --with-jpeg \
                                    --with-xpm --with-freetype \
    && docker-php-ext-install gd \
    && docker-php-source delete \
    \
    && pecl install -o -f redis-5.3.4 \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis \
    \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs yarn \
    \
    && rm -rf /var/lib/apt/lists/*
