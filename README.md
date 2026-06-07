# TravelWithUs

Лендинг туров в Китай по макету Figma: **Next.js**, **Django + DRF**, база **SQLite** (локально) или **PostgreSQL** (Neon / деплой).

## Быстрый запуск (из корня проекта)

Все команды ниже выполняются **из папки `TravelWithUs`**, без `cd backend` / `cd frontend`.

**Первый раз на новом компьютере:**

```powershell
npm run setup
```

**Запуск сайта и API одной командой:**

```powershell
npm run dev
```

- Сайт: **http://127.0.0.1:3100/**
- API: **http://127.0.0.1:8000/**
- Админка Django: **http://127.0.0.1:8000/admin/**

Двойной клик по **`run-dev.bat`** — то же самое, что `npm run dev`.

**База данных (локально — SQLite):**

| Команда | Что делает |
|---------|------------|
| `npm run db:open` | Показывает путь к `backend\db.sqlite3` |
| `npm run migrate` | Применить миграции |
| `npm run admin` | Создать суперпользователя для `/admin/` |

Без `DATABASE_URL` в `backend/.env` используется **`backend\db.sqlite3`**.

---

## PostgreSQL на Neon

Репозиторий: [github.com/behehespat/travelwithusTWU](https://github.com/behehespat/travelwithusTWU)

### 1. Создать базу в Neon

1. Зарегистрируйтесь на [neon.tech](https://neon.tech)
2. **New Project** → имя, например `travelwithus`
3. На дашборде скопируйте **Connection string** (PostgreSQL), вид:
   `postgresql://user:password@ep-....neon.tech/neondb?sslmode=require`

### 2. Подключить к проекту

В `backend/.env` добавьте (одной строкой):

```env
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

Переустановите зависимости и примените миграции:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ..
npm run migrate
npm run admin
```

После этого Django работает с **Neon**, локальный `db.sqlite3` не используется.

### 3. Проверка

```powershell
npm run django -- shell -c "from django.db import connection; print(connection.vendor)"
```

Должно вывести `postgresql`.

### 4. Вернуться на SQLite

Удалите или закомментируйте `DATABASE_URL` в `backend/.env` и снова выполните `npm run migrate`.

---

## Запуск по отдельности (если нужно)

### 1. Backend (порт 8000)

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Корень **http://127.0.0.1:8000/** — служебная страница с подсказкой (это API-сервер, не лендинг). Сам сайт — **Next.js** на **http://127.0.0.1:3100/** (см. раздел Frontend ниже).

Админка: http://127.0.0.1:8000/admin/ — создайте суперпользователя: `python manage.py createsuperuser`.

API:

- `GET /api/tours/`
- `GET /api/tours/<slug>/` — подробная карточка (даты, цена «от», список локаций с фото)
- `GET /api/faqs/`
- `GET /api/testimonials/`
- `POST /api/leads/` (JSON: `name`, `phone`, `telegram`, `policy_accepted`, `personal_data_accepted`)
- `POST /api/auth/register/` — `username`, `email`, `phone`, `vk_url`, `password`, `password_confirm`
- `POST /api/auth/login/` — `username`, `password` → `{ token, username }`
- `GET /api/auth/me/` — заголовок `Authorization: Token <ключ>`

После первой миграции данные туров, FAQ и отзывов подставляются сидом из `core/migrations/0002_seed_content.py`. Поля **даты**, **цена**, **локации с фото** — в `core/migrations/0003_tour_price_dates_places.py` (при необходимости правьте в админке или новой миграцией).

### 2. Frontend (порт 3100)

```powershell
cd frontend
npm install
npm run dev
```

По умолчанию запросы к API идут на `http://127.0.0.1:8000`. Скопируйте `frontend/.env.example` в `frontend/.env.local` и при необходимости задайте:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_ADOBE_FONTS_KIT_ID=ваш_kit_из_adobe_fonts
```

Страницы Next (помимо главной `/`): `/login`, `/register`, `/forgot-password`, `/reminder`, `/phrasebook`, `/tours/shanghai-suzhou` и другие слаги из API.

## Изображения

Главная страница: локальные файлы в **`frontend/public/main-pictures/`**. Карточки туров — **`frontend/public/main-slider/`**.

## Примечание по безопасности Next.js

При публикации обновите Next до актуального патча: https://nextjs.org/blog
