from rest_framework import serializers

from .validators_contact import clean_phone, clean_vk_url


class MeUpdateSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=150, required=False, allow_blank=True, default="")
    birth_date = serializers.DateField(required=False, allow_null=True)
    phone = serializers.CharField(max_length=32, required=False, trim_whitespace=True)
    vk_url = serializers.CharField(max_length=500, required=False, trim_whitespace=True)

    def validate_phone(self, value):
        return clean_phone(value)

    def validate_vk_url(self, value):
        return clean_vk_url(value)


class TourBookingCreateSerializer(serializers.Serializer):
    tour_slug = serializers.SlugField()


class AccountDeleteSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Неверный пароль.")
        return value
