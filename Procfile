release: python manage.py migrate --noinput && python manage.py collectstatic --noinput --clear
web: gunicorn ecommerce_project.wsgi:application --bind 0.0.0.0:$PORT

