"""Клиент VK API: резолв профиля по ссылке и отправка ЛС от сообщества."""

from __future__ import annotations

import json
import logging
import random
import re
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Any
from urllib.parse import urlparse

from django.conf import settings
from django.utils import timezone

logger = logging.getLogger(__name__)

VK_API_VERSION = "5.199"


class VkApiError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f"VK API {code}: {message}")


@dataclass
class VkUserInfo:
    user_id: int
    first_name: str
    last_name: str


def vk_community_token() -> str:
    return (getattr(settings, "VK_COMMUNITY_TOKEN", None) or "").strip()


def vk_api_enabled() -> bool:
    return bool(vk_community_token())


def vk_url_to_user_ids_param(vk_url: str) -> str:
    """Из ссылки vk.com/id123 или vk.com/nick → параметр user_ids для users.get."""
    parsed = urlparse((vk_url or "").strip())
    path = (parsed.path or "").strip("/")
    if not path:
        raise ValueError("Пустая ссылка ВКонтакте.")
    segment = path.split("/")[0]
    if re.fullmatch(r"id\d+", segment, re.I):
        return segment[2:]
    return segment


def _vk_call(method: str, params: dict[str, Any]) -> Any:
    token = vk_community_token()
    if not token:
        raise VkApiError(0, "VK_COMMUNITY_TOKEN не задан в backend/.env")

    query = {
        **params,
        "access_token": token,
        "v": getattr(settings, "VK_API_VERSION", VK_API_VERSION),
    }
    url = f"https://api.vk.com/method/{method}?" + urllib.parse.urlencode(query)
    try:
        with urllib.request.urlopen(url, timeout=20) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise VkApiError(exc.code, body) from exc
    except urllib.error.URLError as exc:
        raise VkApiError(0, str(exc)) from exc

    if "error" in payload:
        err = payload["error"]
        raise VkApiError(err.get("error_code", 0), err.get("error_msg", "unknown"))
    return payload.get("response")


def resolve_vk_user(vk_url: str) -> VkUserInfo | None:
    if not vk_api_enabled():
        logger.warning("VK API отключён: нет токена сообщества.")
        return None
    try:
        user_ids = vk_url_to_user_ids_param(vk_url)
    except ValueError:
        return None

    try:
        rows = _vk_call(
            "users.get",
            {"user_ids": user_ids, "fields": "first_name,last_name"},
        )
    except VkApiError as exc:
        logger.warning("users.get failed for %s: %s", vk_url, exc)
        return None

    if not rows:
        return None

    row = rows[0]
    return VkUserInfo(
        user_id=int(row["id"]),
        first_name=(row.get("first_name") or "").strip(),
        last_name=(row.get("last_name") or "").strip(),
    )


def sync_profile_vk(profile) -> bool:
    """Сохраняет vk_user_id и имя из VK в UserProfile. Возвращает успех."""
    from .models import UserProfile

    if not isinstance(profile, UserProfile):
        return False
    if not (profile.vk_url or "").strip():
        profile.vk_user_id = None
        profile.vk_first_name = ""
        profile.vk_last_name = ""
        profile.save(update_fields=["vk_user_id", "vk_first_name", "vk_last_name"])
        return False

    info = resolve_vk_user(profile.vk_url)
    if not info:
        return False

    profile.vk_user_id = info.user_id
    profile.vk_first_name = info.first_name
    profile.vk_last_name = info.last_name
    profile.save(update_fields=["vk_user_id", "vk_first_name", "vk_last_name"])
    return True


def booking_notification_message(booking) -> str:
    profile = booking.user.profile
    first = (profile.vk_first_name or "").strip()
    last = (profile.vk_last_name or "").strip()
    if not first and not last:
        first = (booking.user.first_name or "").strip()
    name = " ".join(part for part in (first, last) if part).strip() or booking.user.username

    tour_title = booking.tour.title
    return (
        f"Здравствуйте, {name}!\n\n"
        f"Спасибо, что выбрали нас. Вы оформили заявку на тур «{tour_title}».\n"
        "В скором времени с вами свяжется менеджер и поможет вам с оформлением заявки. "
        "Пожалуйста, ожидайте!"
    )


def send_message_to_user(user_id: int, message: str) -> int:
    """Отправляет ЛС. Возвращает message_id."""
    return int(
        _vk_call(
            "messages.send",
            {
                "user_id": user_id,
                "random_id": random.randint(1, 2_147_483_647),
                "message": message,
            },
        )
    )


def notify_booking_via_vk(booking) -> tuple[bool, str]:
    """
    Отправляет уведомление о заявке в ЛС VK.
    Возвращает (успех, текст ошибки или пустая строка).
    """
    from .models import TourBooking

    if not isinstance(booking, TourBooking):
        return False, "invalid booking"

    if not vk_api_enabled():
        return False, "VK_COMMUNITY_TOKEN не задан"

    from .models import UserProfile

    profile, _ = UserProfile.objects.get_or_create(user=booking.user)
    if not profile.vk_user_id:
        sync_profile_vk(profile)
        profile.refresh_from_db()

    if not profile.vk_user_id:
        return False, "Не удалось определить id пользователя VK по ссылке профиля"

    message = booking_notification_message(booking)
    try:
        send_message_to_user(profile.vk_user_id, message)
    except VkApiError as exc:
        hint = ""
        if exc.code == 901:
            hint = (
                " Пользователь не разрешил сообщения от сообщества — "
                "попросите написать «Привет» в https://vk.com/travelwithustwu"
            )
        elif exc.code == 902:
            hint = " Пользователь запретил сообщения от сообщества."
        return False, f"{exc.message}{hint}"

    booking.vk_notified_at = timezone.now()
    booking.vk_notify_error = ""
    booking.save(update_fields=["vk_notified_at", "vk_notify_error"])
    return True, ""
