"""Корень бэкенда: API-сервер, не лендинг."""

from django.http import HttpResponse


def backend_home(_request):
    body = """<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TravelWithUs API</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; color: #27304f; }
    code { background: #f7f7f6; padding: 0.15em 0.4em; border-radius: 4px; }
    a { color: #ec9b74; font-weight: 600; }
    ul { padding-left: 1.2rem; }
  </style>
</head>
<body>
  <h1>TravelWithUs - Django (API)</h1>
  <p>Этот процесс - только <strong>REST API</strong> и админка. Главная страница лендинга отдаётся <strong>Next.js</strong> на другом порту.</p>
  <h2>Что открыть</h2>
  <ul>
    <li><strong>Лендинг:</strong> в другом терминале запустите <code>cd frontend</code> → <code>npm run dev</code> и откройте <a href="http://127.0.0.1:3000/">http://127.0.0.1:3000/</a></li>
    <li><a href="/api/tours/">/api/tours/</a> - туры</li>
    <li><a href="/api/testimonials/">/api/testimonials/</a> - отзывы</li>
    <li><a href="/api/faqs/">/api/faqs/</a> - FAQ</li>
    <li><a href="/admin/">/admin/</a> - админка Django</li>
  </ul>
</body>
</html>"""
    return HttpResponse(body, content_type="text/html; charset=utf-8")
