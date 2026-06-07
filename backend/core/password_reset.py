"""Отправка письма со ссылкой на сброс пароля."""

from __future__ import annotations

import logging

from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

logger = logging.getLogger(__name__)


def build_password_reset_link(user: User) -> str:
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    base = (getattr(settings, "FRONTEND_URL", "") or "http://127.0.0.1:3100").rstrip("/")
    return f"{base}/reset-password?uid={uid}&token={token}"


def send_password_reset_email(user: User) -> bool:
    if not (user.email or "").strip():
        return False

    link = build_password_reset_link(user)
    subject = "TravelWithUs - сброс пароля"
    message = (
        f"Здравствуйте, {user.first_name or user.username}!\n\n"
        "Вы запросили сброс пароля на сайте TravelWithUs.\n"
        f"Перейдите по ссылке и задайте новый пароль:\n{link}\n\n"
        "Ссылка действует ограниченное время. Если вы не запрашивали сброс, "
        "просто проигнорируйте это письмо.\n\n"
        "TravelWithUs"
    )

    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        return True
    except Exception:
        logger.exception("password reset email failed for user_id=%s", user.pk)
        return False
