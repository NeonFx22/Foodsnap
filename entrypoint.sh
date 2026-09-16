#!/bin/sh
set -e

python manage.py migrate --noinput

exec gunicorn foodsnap.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3