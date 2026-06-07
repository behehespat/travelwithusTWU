from rest_framework import serializers

from .models import TourBooking


class AdminBookingUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=TourBooking.Status.choices)
