from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserProfile
from .validators_contact import clean_email, clean_phone, clean_vk_url
from .vk import sync_profile_vk


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, trim_whitespace=True)
    email = serializers.EmailField(max_length=254, trim_whitespace=True)
    password = serializers.CharField(write_only=True, min_length=8, style={"input_type": "password"})
    password_confirm = serializers.CharField(write_only=True, min_length=8, style={"input_type": "password"})
    phone = serializers.CharField(max_length=32, trim_whitespace=True)
    vk_url = serializers.CharField(max_length=500, trim_whitespace=True)

    def validate_email(self, value):
        return clean_email(value)

    def validate_phone(self, value):
        return clean_phone(value)

    def validate_vk_url(self, value):
        return clean_vk_url(value)

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({"password_confirm": "Пароли не совпадают."})
        if User.objects.filter(username__iexact=attrs["username"]).exists():
            raise serializers.ValidationError({"username": "Такой логин уже занят."})
        if User.objects.filter(email__iexact=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "Этот email уже используется."})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password_confirm", None)
        phone = validated_data.pop("phone")
        vk_url = validated_data.pop("vk_url")
        username = validated_data["username"].strip()
        email = validated_data["email"]
        user = User.objects.create_user(username=username, email=email, password=password)
        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.phone = phone
        profile.vk_url = vk_url
        profile.save(update_fields=["phone", "vk_url"])
        sync_profile_vk(profile)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, trim_whitespace=True)
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        user = authenticate(
            request=self.context.get("request"),
            username=attrs["username"].strip(),
            password=attrs["password"],
        )
        if user is None:
            raise serializers.ValidationError({"detail": "Неверный логин или пароль."})
        attrs["user"] = user
        return attrs
