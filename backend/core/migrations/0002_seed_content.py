from django.db import migrations


def forwards(apps, schema_editor):
    Tour = apps.get_model("core", "Tour")
    FAQItem = apps.get_model("core", "FAQItem")
    Testimonial = apps.get_model("core", "Testimonial")

    if Tour.objects.exists():
        return

    tours = [
        {
            "slug": "shanghai-suzhou",
            "title": "Китай: Шанхай - Сучжоу, сады и футуристика",
            "description": (
                "Мягкое знакомство с Китаем через его сердце - Шанхай. Сбалансированная программа с "
                "прогулками по центру Шанхая, знакомством с соседним городом Сучжоу - его садом и "
                "китайскими традиционными постройками"
            ),
            "duration_days": 5,
            "tariff_label": "Базовый тариф",
            "image_url": "https://www.figma.com/api/mcp/asset/2f2348fc-5d5d-46cf-9a9b-7dec43c80269",
            "sort_order": 1,
        },
        {
            "slug": "shanghai-avatar",
            "title": "Шанхайские небоскребы и парящие горы Китая",
            "description": (
                "Тур, который удивляет, открывая новые горизонты. Здесь вы столкнетесь с двумя гранями "
                "Китая: знакомым Шанхаем с его небоскребами и загадочной природой чарующих Гор Аватар"
            ),
            "duration_days": 5,
            "tariff_label": "Базовый тариф",
            "image_url": "https://www.figma.com/api/mcp/asset/d107fece-3b19-4190-81ad-2d313a96b2f3",
            "sort_order": 2,
        },
        {
            "slug": "great-china",
            "title": "Великий Китай",
            "description": (
                "Откройте мощь Китая в одном туре: от чуда света до Всемирного наследия ЮНЕСКО и "
                "природных красот. Горы Аватара, Великая Китайская стена и Терракотовая армия, а также "
                "футуристичные улицы Шанхая"
            ),
            "duration_days": 8,
            "tariff_label": "Базовый тариф",
            "image_url": "https://www.figma.com/api/mcp/asset/0674c56e-3285-49d3-ae1a-aba84fc55b3c",
            "sort_order": 3,
        },
        {
            "slug": "contrasts",
            "title": "Контрасты Поднебесной",
            "description": (
                "Сочетание контрастов Китая и легендарных точек: удивительная природа, аутентичная "
                "архитектура и современные мегаполисы. Исследуем горы Яншо и Чжанцзяцзе, посещаем "
                "Пекин и Шанхай, знакомимся с китайской Венецией"
            ),
            "duration_days": 9,
            "tariff_label": "Базовый тариф",
            "image_url": "https://www.figma.com/api/mcp/asset/e4d1a34c-2481-41a2-ac9b-3fbf310933ab",
            "sort_order": 4,
        },
    ]
    Tour.objects.bulk_create([Tour(**t) for t in tours])

    faqs = [
        (1, 1, "Как забронировать тур?", "Оставьте заявку на сайте или напишите нам — подскажем свободные даты и оформим договор."),
        (2, 1, "Сколько в группе человек?", "Комфортные группы: ориентир до 12–16 человек в зависимости от тура."),
        (3, 1, "Есть ли ограничения по возрасту?", "Туры рассчитаны на взрослых путешественников; для детей и пожилых — по согласованию."),
        (4, 1, "Что брать в путешествие?", "Пришлём чек-лист после бронирования: документы, валюта, удобная обувь и сезонная одежда."),
        (5, 2, "Где встречаемся?", "Встреча в аэропорту города старта тура — точные даты и рейсы согласуем заранее."),
        (6, 2, "Включено ли проживание в тур?", "Да, проживание в проверенных отелях включено в программу."),
        (7, 2, "Нужна ли какая то физическая подготовка в туре?", "Базовая выносливость для прогулок; экстремальных нагрузок нет."),
        (8, 2, "Нужна ли виза в Китай?", "Требования зависят от гражданства и срока поездки — проконсультируем индивидуально."),
    ]
    FAQItem.objects.bulk_create(
        [FAQItem(sort_order=o, column=c, question=q, answer=a) for o, c, q, a in faqs]
    )

    testimonials = [
        ("Владимир", "Организация на высшем уровне: чёткие сроки, отзывчивые гиды и насыщенная программа."),
        ("Ангелина", "Путешествие превзошло ожидания — Китай открылся с совершенно новой стороны."),
        ("Александр", "Спасибо команде TWU за заботу и безопасность на всём маршруте."),
    ]
    Testimonial.objects.bulk_create(
        [Testimonial(name=n, text=t, sort_order=i) for i, (n, t) in enumerate(testimonials, start=1)]
    )


def backwards(apps, schema_editor):
    Tour = apps.get_model("core", "Tour")
    FAQItem = apps.get_model("core", "FAQItem")
    Testimonial = apps.get_model("core", "Testimonial")
    Tour.objects.filter(
        slug__in=[
            "shanghai-suzhou",
            "shanghai-avatar",
            "great-china",
            "contrasts",
        ]
    ).delete()
    FAQItem.objects.all().delete()
    Testimonial.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
