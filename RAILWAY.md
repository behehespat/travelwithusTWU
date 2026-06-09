# Деплой TravelWithUs на Railway (GitHub)

Проект состоит из **двух сервисов** в одном репозитории:

| Сервис | Папка | Назначение |
|--------|-------|------------|
| **API** | `backend/` | Django + PostgreSQL |
| **Web** | `frontend/` | Next.js |

---

## 1. Подготовка GitHub

```bash
git init
git add .
git commit -m "Prepare for Railway deploy"
git remote add origin https://github.com/ВАШ_АККАУНТ/TravelWithUs.git
git push -u origin main
```

Убедитесь, что в репозиторий **не попали**:
- `backend/.env`
- `backend/db.sqlite3`
- `backend/.venv/`
- `frontend/.env.local`

(они в `.gitignore`)

---

## 2. Railway: проект и PostgreSQL

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
2. Выберите репозиторий `TravelWithUs`
3. **Add Plugin** → **PostgreSQL** (база для API)

---

## 3. Сервис API (backend)

### Создание

1. В проекте Railway: **New** → **GitHub Repo** → тот же репозиторий (или Duplicate service)
2. **Settings** → **Root Directory** → `backend`
3. **Settings** → **Networking** → **Generate Domain** (получите URL вида `https://xxx.up.railway.app`)

### Переменные (Variables)

Подключите PostgreSQL к сервису: **Variables** → **Add Reference** → `DATABASE_URL` из Postgres.

Остальное (см. `railway.env.example`):

| Переменная | Значение |
|------------|----------|
| `SECRET_KEY` | Случайная строка 50+ символов |
| `DEBUG` | `false` |
| `FRONTEND_URL` | URL фронтенда (заполните после шага 4) |
| `CSRF_TRUSTED_ORIGINS` | `https://ваш-frontend...,https://ваш-backend...` |
| `EMAIL_HOST_PASSWORD` | Пароль приложения Gmail |
| `EMAIL_HOST_USER` | `travelwithuswtu@gmail.com` |
| `VK_COMMUNITY_TOKEN` | По желанию |

`RAILWAY_PUBLIC_DOMAIN` Railway подставляет сам — `ALLOWED_HOSTS` настраивать не обязательно.

### Деплой

Railway соберёт Python из `requirements.txt` и запустит `start.sh`:
- миграции
- `collectstatic`
- Gunicorn на порту `$PORT`

Проверка: откройте `https://ВАШ-BACKEND.up.railway.app/api/health/` → `{"status":"ok"}`

### Суперпользователь (один раз)

В Railway: сервис **backend** → **Settings** → **Deploy** → или вкладка с shell:

```bash
python manage.py createsuperuser
```

Или локально через Railway CLI:

```bash
railway link
railway run python manage.py createsuperuser
```

Админка: `https://ВАШ-BACKEND.up.railway.app/admin/`

---

## 4. Сервис Web (frontend)

### Создание

1. **New** → **GitHub Repo** → тот же репозиторий
2. **Root Directory** → `frontend`
3. **Generate Domain** для фронтенда

### Переменные (до первого успешного build!)

| Переменная | Значение |
|------------|----------|
| `NEXT_PUBLIC_API_URL` | `https://ВАШ-BACKEND.up.railway.app` |
| `API_URL` | то же (для SSR на главной и страницах туров) |

**Важно:** после смены `NEXT_PUBLIC_API_URL` нужен **Redeploy** (пересборка).

### Деплой

Сборка: `npm ci && npm run build`  
Старт: `next start -H 0.0.0.0` (порт из `$PORT`)

---

## 5. Связать фронт и API

1. Скопируйте URL фронтенда
2. В сервисе **backend** задайте `FRONTEND_URL` и `CSRF_TRUSTED_ORIGINS`
3. **Redeploy backend** (для CORS)

Порядок при первом деплое:
1. Backend + Postgres → получить URL API
2. Frontend с `NEXT_PUBLIC_API_URL` → получить URL сайта
3. Backend: `FRONTEND_URL` → redeploy

---

## 6. Локальная разработка (без изменений)

```powershell
npm run setup
npm run dev
```

Локально по-прежнему SQLite и `backend/.env`.

---

## 7. Частые проблемы

| Симптом | Решение |
|---------|---------|
| CORS error в браузере | Проверьте `FRONTEND_URL` на backend (точный https, без `/` в конце) |
| API 400 Bad Request | `ALLOWED_HOSTS` / домен Railway |
| Сайт без данных туров | `NEXT_PUBLIC_API_URL` неверный или не пересобрали frontend |
| Письма не уходят | `EMAIL_HOST_PASSWORD` — пароль приложения Gmail |
| Admin 403 CSRF | Добавьте backend URL в `CSRF_TRUSTED_ORIGINS` |
| Build frontend падает | Node 20+; смотрите логи Build в Railway |

---

## 8. Структура файлов деплоя

```
backend/
  railway.toml      # конфиг Railway
  nixpacks.toml     # Python 3.12 + pip
  start.sh          # migrate + gunicorn
  requirements.txt  # + gunicorn, psycopg2, whitenoise

frontend/
  railway.toml      # build + start Next.js
  package.json      # start с -H 0.0.0.0

railway.env.example # шаблон переменных
```
