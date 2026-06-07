from django.db import migrations, models


def default_empty_places():
    return []


def fill_tour_details(apps, schema_editor):
    Tour = apps.get_model("core", "Tour")
    q = "auto=format&fit=crop&w=960&h=540&q=82"
    u = lambda p: f"https://images.unsplash.com/photo-{p}?{q}"

    extras = {
        "shanghai-suzhou": {
            "price_from_rub": 189_000,
            "dates_display": (
                "Выезды 2026 (ориентир): 12–19 мая • 2–9 июня • 14–21 сентября. "
                "Точные даты и рейсы согласуем при бронировании."
            ),
            "places": [
                {
                    "name": "Шанхай, набережная Бунд",
                    "detail": "Панорама колониальной архитектуры и небоскрёбов Пудуна через Хуанпу.",
                    "image_url": u("1548918870-1dad094e0e58"),
                },
                {
                    "name": "Сучжоу, классические сады",
                    "detail": "Прогулка по «восточной Венеции»: мосты, каналы и сады Юанлин.",
                    "image_url": u("1582657231675-7a648bf8edc2"),
                },
                {
                    "name": "Шанхай, Старый город",
                    "detail": "Узкие улочки, чайные дома и атмосфера «старого Китая» в центре мегаполиса.",
                    "image_url": u("1538428493348-917798860e0e"),
                },
            ],
        },
        "shanghai-avatar": {
            "price_from_rub": 219_000,
            "dates_display": (
                "Выезды 2026 (ориентир): 18–25 мая • 15–22 июня • 20–27 сентября. "
                "Точные даты — при бронировании."
            ),
            "places": [
                {
                    "name": "Шанхай, Луцзяцзуй",
                    "detail": "Футуристический Пудун: башня Шанхай Тауэр и смотровые площадки.",
                    "image_url": u("1584464491033-06628f3a416b"),
                },
                {
                    "name": "Чжанцзяцзе, парк Улинъюань",
                    "detail": "Кварцевые столбы и «парящие» горы, вдохновившие фильм «Аватар».",
                    "image_url": u("1513415756790-2ac1db1297d0"),
                },
                {
                    "name": "Тяньцзымэнь — стеклянный мост",
                    "detail": "Панорамные виды на ущелья и пики Сюаньфэн.",
                    "image_url": u("1508804185872-d7badad00f7d"),
                },
            ],
        },
        "great-china": {
            "price_from_rub": 349_000,
            "dates_display": (
                "Выезды 2026 (ориентир): 5–14 июня • 10–19 июля • 2–11 октября. "
                "Точные даты — при бронировании."
            ),
            "places": [
                {
                    "name": "Чжанцзяцзе",
                    "detail": "Национальный лесной парк и кабельные дороги среди столбов.",
                    "image_url": u("1513415756790-2ac1db1297d0"),
                },
                {
                    "name": "Великая стена (Мутяньюй)",
                    "detail": "Прогулка по одному из самых живописных участков стены.",
                    "image_url": u("1528181304800-259b08848526"),
                },
                {
                    "name": "Сиань, Терракотовая армия",
                    "detail": "Музей первого императора Цинь и знаменитые воины из обожжённой глины.",
                    "image_url": u("1565340900580-2cb1e52c3eae"),
                },
                {
                    "name": "Шанхай",
                    "detail": "Современный мегаполис как финальный аккорд маршрута.",
                    "image_url": u("1538428493348-917798860e0e"),
                },
            ],
        },
        "contrasts": {
            "price_from_rub": 379_000,
            "dates_display": (
                "Выезды 2026 (ориентир): 22 мая – 1 июня • 12–22 июля • 18–28 сентября. "
                "Точные даты — при бронировании."
            ),
            "places": [
                {
                    "name": "Яншо, река Юйлун",
                    "detail": "Карстовые пики и бамбуковые плоты на изумрудной воде.",
                    "image_url": u("1547987529-c8d8c0e5c0b8"),
                },
                {
                    "name": "Чжанцзяцзе",
                    "detail": "Парк Аватара и смотровые площадки над облаками.",
                    "image_url": u("1513415756790-2ac1db1297d0"),
                },
                {
                    "name": "Пекин, Запретный город",
                    "detail": "Императорский дворец и сердце китайской истории.",
                    "image_url": u("1508804185872-d7badad00f7d"),
                },
                {
                    "name": "Чжуцзяцзяо",
                    "detail": "«Китайская Венеция»: каналы, мосты и чайные дома у воды.",
                    "image_url": u("1566378246598-81b18435111a"),
                },
            ],
        },
    }
    for slug, data in extras.items():
        Tour.objects.filter(slug=slug).update(**data)


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0002_seed_content"),
    ]

    operations = [
        migrations.AddField(
            model_name="tour",
            name="price_from_rub",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="tour",
            name="dates_display",
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="tour",
            name="places",
            field=models.JSONField(default=default_empty_places),
        ),
        migrations.RunPython(fill_tour_details, migrations.RunPython.noop),
    ]
