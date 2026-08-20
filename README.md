# FoodSnap

Design and implementation of a food image-to-recipe processing system using
deep learning. Upload a photo of a dish and FoodSnap matches it against a
dataset of food images to return the closest recipes, using cosine similarity
between feature vectors. Images are encoded with DenseNet201 when TensorFlow
is available, otherwise with a built-in lightweight color/texture encoder, so
the app always works.

## Features

- Upload a dish photo and get ranked recipe matches with a **confidence %**.
- **Real user accounts**: register, log in, save favorite recipes, see your
  own upload history.
- **Admin dashboard** with aggregate stats (staff accounts see all uploads).
- Automatic fallback encoder when TensorFlow is unavailable.
- `scripts/finetune.py` — train a custom classifier on your own dishes.
- `scripts/evaluate.py` — top-1/top-5 accuracy report of the matcher.
- Production-ready: environment-variable config, WhiteNoise static serving,
  Docker + docker-compose, unit tests.

## Project layout

```
foodsnap/
├── manage.py              # Django management entrypoint
├── foodsnap/              # Django project: settings, urls, wsgi/asgi
├── main/                  # The FoodSnap app
│   ├── models.py          # UploadRecord, FavoriteRecipe
│   ├── views.py           # home, register, login, dashboard, favorites
│   ├── forms.py           # ImageUploadForm, LoginForm, RegisterForm
│   ├── ml_utils.py        # encoders + cosine-similarity matching
│   ├── admin.py           # Django admin registration
│   ├── tests.py           # unit tests
│   ├── migrations/
│   ├── templates/main/    # base, home, login, register, dashboard, favorites
│   └── static/main/
│       ├── css/style.css
│       ├── js/script.js
│       ├── recipes.json   # recipe dataset (10 placeholder dishes)
│       └── data/          # encodings.txt + enc_names.txt (generated)
├── scripts/
│   ├── make_sample_dataset.py  # generates placeholder dish photos
│   ├── encode_dataset.py       # builds the feature index
│   ├── evaluate.py             # top-k accuracy report
│   ├── finetune.py             # train a custom classifier (needs TensorFlow)
│   └── scrape_recipes.py       # BeautifulSoup recipe scraper
├── dataset/images/        # reference food photos (one dish per filename prefix)
├── media/uploads/         # uploaded photos (dashboard thumbnails)
├── requirements.txt
├── .env.example           # config template (copy to .env)
├── Dockerfile
└── docker-compose.yml
```

## Quick start

```bash
python -m venv venv
venv\Scripts\activate                 # or: source venv/bin/activate
pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser      # optional: admin dashboard access
python manage.py runserver
```

Open `http://127.0.0.1:8000/` for the upload page, `/register/` to create a
user, and `/dashboard/` (or Django's `/django-admin/`) for staff.

A sample dataset (2 synthetic photos per dish) and a prebuilt feature index
are included, so matching works out of the box. Replace the synthetic photos
with real ones for meaningful results.

## Matching how it works

1. `scripts/encode_dataset.py` encodes every photo in `dataset/images/` and
   writes `main/static/main/data/encodings.txt` (feature vectors) and
   `enc_names.txt` (filenames). The encoder used is DenseNet201 when
   TensorFlow is installed, otherwise a pure numpy/Pillow fallback — the
   index must be (re)built with the encoder the app will use.
2. At request time the uploaded photo is encoded the same way and compared to
   the index with cosine similarity. The top matches are mapped to entries in
   `recipes.json` by the dish name (the part of the filename before the last
   underscore, spaces replacing underscores).

## Building your own dataset

1. Add recipe data to `main/static/main/recipes.json` (name, calories,
   cooking_time, ingredients, directions) — or adapt `scripts/scrape_recipes.py`.
2. Put reference photos in `dataset/images/`, e.g. `jollof_rice_001.jpg`.
3. Rebuild the index:
   ```bash
   python scripts/encode_dataset.py
   ```
4. Measure matching quality:
   ```bash
   python scripts/evaluate.py
   ```

## Training a custom model (optional)

To replace ImageNet feature matching with a classifier trained on your dishes
(requires a TensorFlow-supported Python, e.g. 3.12, or Google Colab):

```bash
python scripts/finetune.py --data dataset --epochs 20
```

`dataset/train/<dish>/` and `dataset/validation/<dish>/` must contain the
photos. The saved `.keras` model can be wired into `main/ml_utils.py`.

## Deployment

For production, copy `.env.example` to `.env` and set `DJANGO_DEBUG=0`, a
real `DJANGO_SECRET_KEY`, and your `DJANGO_ALLOWED_HOSTS`. Then:

```bash
python manage.py collectstatic
python manage.py migrate
gunicorn foodsnap.wsgi:application --bind 0.0.0.0:8000
```

Or with Docker:

```bash
cp .env.example .env   # edit values
docker compose up --build
```

## Tests

```bash
python manage.py test main
```

## Notes

- TensorFlow is optional. On Pythons it doesn't support (e.g. 3.14) the app
  automatically uses a built-in color-and-texture encoder.
- Optional extras: `faiss-cpu` for fast nearest-neighbor search on large
  datasets, `gunicorn` for the production web server (Linux only).
