import logging

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Tour, TourBooking
from .serializers_account import TourBookingCreateSerializer
from .vk import notify_booking_via_vk

logger = logging.getLogger(__name__)


class TourBookingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        ser = TourBookingCreateSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        slug = ser.validated_data["tour_slug"]
        tour = get_object_or_404(Tour, slug=slug)

        booking, created = TourBooking.objects.get_or_create(
            user=request.user,
            tour=tour,
            defaults={"status": TourBooking.Status.NEW},
        )
        should_notify = created
        if not created:
            if booking.status in (
                TourBooking.Status.NEW,
                TourBooking.Status.IN_PROGRESS,
                TourBooking.Status.REVIEWED,
            ):
                return Response(
                    {
                        "detail": "Заявка на этот тур уже отправлена.",
                        "tour_slug": tour.slug,
                        "tour_title": tour.title,
                        "status": booking.status,
                    },
                    status=status.HTTP_200_OK,
                )

        vk_sent = False
        vk_error = ""
        if should_notify:
            ok, vk_error = notify_booking_via_vk(booking)
            vk_sent = ok
            if not ok:
                booking.vk_notify_error = vk_error
                booking.save(update_fields=["vk_notify_error"])
                logger.warning("VK notify failed booking=%s: %s", booking.pk, vk_error)

        return Response(
            {
                "detail": "Заявка принята.",
                "tour_slug": tour.slug,
                "tour_title": tour.title,
                "status": booking.status,
                "vk_notified": vk_sent,
                **({"vk_notify_error": vk_error} if vk_error else {}),
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )
