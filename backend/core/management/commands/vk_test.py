"""Проверка VK: резолв ссылки и тестовое сообщение.

Примеры:
  python manage.py vk_test --vk-url https://vk.com/id123456
  python manage.py vk_test --username myuser
"""

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError

from core.models import Tour, TourBooking, UserProfile
from core.vk import (
    notify_booking_via_vk,
    resolve_vk_user,
    send_message_to_user,
    sync_profile_vk,
    vk_api_enabled,
)


class Command(BaseCommand):
    help = "Проверка токена VK и отправки личного сообщения"

    def add_arguments(self, parser):
        parser.add_argument("--vk-url", type=str, help="Ссылка на профиль VK для теста")
        parser.add_argument("--username", type=str, help="Логин пользователя сайта для теста заявки")
        parser.add_argument("--message", type=str, default="", help="Произвольный текст (иначе шаблон заявки)")

    def handle(self, *args, **options):
        if not vk_api_enabled():
            raise CommandError(
                "Задайте VK_COMMUNITY_TOKEN в backend/.env и перезапустите сервер."
            )

        vk_url = (options.get("vk_url") or "").strip()
        username = (options.get("username") or "").strip()
        custom_message = (options.get("message") or "").strip()

        if username:
            user = User.objects.filter(username=username).first()
            if not user:
                raise CommandError(f"Пользователь «{username}» не найден.")
            profile, _ = UserProfile.objects.get_or_create(user=user)
            if not profile.vk_url:
                raise CommandError("У пользователя не указана ссылка VK в профиле.")
            sync_profile_vk(profile)
            profile.refresh_from_db()
            tour = Tour.objects.order_by("sort_order", "id").first()
            if not tour:
                raise CommandError("В базе нет туров.")
            booking, _ = TourBooking.objects.get_or_create(
                user=user,
                tour=tour,
                defaults={"status": TourBooking.Status.PENDING},
            )
            if custom_message:
                if not profile.vk_user_id:
                    raise CommandError("Не удалось получить vk_user_id.")
                mid = send_message_to_user(profile.vk_user_id, custom_message)
                self.stdout.write(self.style.SUCCESS(f"Сообщение отправлено, message_id={mid}"))
            else:
                ok, err = notify_booking_via_vk(booking)
                if ok:
                    self.stdout.write(self.style.SUCCESS("Уведомление о заявке отправлено."))
                else:
                    raise CommandError(err)
            return

        if not vk_url:
            raise CommandError("Укажите --vk-url или --username.")

        info = resolve_vk_user(vk_url)
        if not info:
            raise CommandError(f"Не удалось найти пользователя по ссылке: {vk_url}")

        self.stdout.write(f"VK id={info.user_id}, имя={info.first_name} {info.last_name}")
        text = custom_message or (
            f"Здравствуйте, {info.first_name}! Это тест бота TravelWithUs. "
            "Если вы видите это сообщение — интеграция работает."
        )
        mid = send_message_to_user(info.user_id, text)
        self.stdout.write(self.style.SUCCESS(f"Сообщение отправлено, message_id={mid}"))
