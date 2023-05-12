# Base image
FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    unzip \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring xml zip pdo_pgsql

# Install composer
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /var/www/html/storage
RUN mkdir -p /var/www/html
# Copy source code to container
COPY backend/. /var/www/html

# Set file permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html/storage

# Install composer dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev


# Enable Apache modules
RUN a2enmod rewrite

# Expose port
EXPOSE 8000

# Create and set permissions for the run script
RUN echo "#!/bin/bash\nphp artisan migrate && php artisan serve --host=0.0.0.0 --port=8000" > /var/www/html/run.sh && \
    chmod +x /var/www/html/run.sh

# Start Apache and the Laravel app with the run script
CMD ["/var/www/html/run.sh"]