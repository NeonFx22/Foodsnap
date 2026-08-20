FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Build the compressed static manifest exactly as production will use it,
# so whitenoise's CompressedManifestStaticFilesStorage can resolve {% static %}.
ENV DJANGO_DEBUG=0
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn foodsnap.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3"]
