import re
from urllib.parse import urlparse

from rest_framework import serializers


def clean_phone(value: str) -> str:
    s = (value or "").strip()
    if not s:
        raise serializers.ValidationError("Укажите номер телефона.")
    digits = re.sub(r"\D", "", s)
    if len(digits) < 10:
        raise serializers.ValidationError("В номере должно быть не менее 10 цифр.")
    if len(s) > 32:
        raise serializers.ValidationError("Слишком длинный номер.")
    return s


def clean_email(value: str) -> str:
    email = (value or "").strip().lower()
    if not email:
        raise serializers.ValidationError("Укажите email.")
    if len(email) > 254:
        raise serializers.ValidationError("Слишком длинный email.")
    return email


def clean_vk_url(value: str) -> str:
    v = (value or "").strip()
    if not v:
        raise serializers.ValidationError("Укажите ссылку на страницу ВКонтакте.")
    if len(v) > 500:
        raise serializers.ValidationError("Слишком длинная ссылка.")
    if not re.match(r"^https?://", v, re.I):
        v = "https://" + v.lstrip("/")
    parsed = urlparse(v)
    host = (parsed.hostname or "").lower()
    if host.startswith("www."):
        host = host[4:]
    if host not in ("vk.com", "m.vk.com", "vk.ru", "m.vk.ru"):
        raise serializers.ValidationError("Ссылка должна вести на vk.com или vk.ru.")
    return v
