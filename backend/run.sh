#!/bin/bash

# Run migrations
php artisan migrate

# Start the server
php artisan serve --host=0.0.0.0 --port=8000
