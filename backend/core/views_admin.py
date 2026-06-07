from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TourBooking, UserProfile
from .serializers_admin import AdminBookingUpdateSerializer


def _booking_payload(b: TourBooking, profiles: dict) -> dict:
    profile = profiles.get(b.user_id)
    return {
        "id": b.id,
        "username": b.user.username,
        "first_name": b.user.first_name or "",
        "phone": profile.phone if profile else "",
        "vk_url": profile.vk_url if profile else "",
        "tour_slug": b.tour.slug,
        "tour_title": b.tour.title,
        "status": b.status,
        "created_at": b.created_at.isoformat(),
        "vk_notified_at": b.vk_notified_at.isoformat() if b.vk_notified_at else None,
        "vk_notify_error": b.vk_notify_error or "",
    }


class AdminBookingsListView(APIView):
    """Список заявок на туры для менеджеров (is_staff)."""

    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        rows = list(TourBooking.objects.select_related("user", "tour").order_by("-created_at"))
        user_ids = [b.user_id for b in rows]
        profiles = {p.user_id: p for p in UserProfile.objects.filter(user_id__in=user_ids)}
        return Response([_booking_payload(b, profiles) for b in rows])


class AdminBookingDetailView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, booking_id: int, *args, **kwargs):
        booking = get_object_or_404(TourBooking.objects.select_related("user", "tour"), pk=booking_id)
        ser = AdminBookingUpdateSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        booking.status = ser.validated_data["status"]
        booking.save(update_fields=["status"])
        profile = UserProfile.objects.filter(user_id=booking.user_id).first()
        profiles = {booking.user_id: profile} if profile else {}
        return Response(_booking_payload(booking, profiles))

    def delete(self, request, booking_id: int, *args, **kwargs):
        booking = get_object_or_404(TourBooking, pk=booking_id)
        if booking.status != TourBooking.Status.REVIEWED:
            return Response(
                {"detail": "Удалять можно только заявки со статусом «Рассмотрена»."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
