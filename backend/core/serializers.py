from rest_framework import serializers

from .models import FAQItem, LeadSubmission, Testimonial, Tour


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = (
            "slug",
            "title",
            "description",
            "duration_days",
            "tariff_label",
            "image_url",
            "price_from_rub",
            "dates_display",
        )


class TourDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = (
            "slug",
            "title",
            "description",
            "duration_days",
            "tariff_label",
            "image_url",
            "price_from_rub",
            "dates_display",
            "places",
        )


class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = ("id", "question", "answer", "column")


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ("id", "name", "text")


class LeadSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSubmission
        fields = (
            "name",
            "phone",
            "telegram",
            "policy_accepted",
            "personal_data_accepted",
        )

    def validate(self, attrs):
        if not attrs.get("policy_accepted"):
            raise serializers.ValidationError(
                {"policy_accepted": "Нужно принять политику конфиденциальности."}
            )
        if not attrs.get("personal_data_accepted"):
            raise serializers.ValidationError(
                {"personal_data_accepted": "Нужно согласие на обработку данных."}
            )
        return attrs
