from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TourBooking, UserProfile
from .serializers_account import AccountDeleteSerializer, MeUpdateSerializer
from .serializers_auth import LoginSerializer, RegisterSerializer
from .vk import sync_profile_vk


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"username": user.username},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})


def _me_payload(user):
    profile, _ = UserProfile.objects.get_or_create(user=user)
    bookings = TourBooking.objects.filter(user=user).select_related("tour")
    return {
        "username": user.username,
        "email": user.email or "",
        "first_name": user.first_name or "",
        "birth_date": profile.birth_date.isoformat() if profile.birth_date else None,
        "phone": profile.phone or "",
        "vk_url": profile.vk_url or "",
        "is_staff": user.is_staff,
        "bookings": [
            {
                "tour_slug": b.tour.slug,
                "tour_title": b.tour.title,
                "status": b.status,
                "created_at": b.created_at.isoformat(),
            }
            for b in bookings
        ],
    }


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(_me_payload(request.user))

    def patch(self, request, *args, **kwargs):
        ser = MeUpdateSerializer(data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        user = request.user
        profile, _ = UserProfile.objects.get_or_create(user=user)

        if "first_name" in ser.validated_data:
            user.first_name = ser.validated_data["first_name"].strip()
            user.save(update_fields=["first_name"])

        if "birth_date" in ser.validated_data:
            profile.birth_date = ser.validated_data["birth_date"]

        if "phone" in ser.validated_data:
            profile.phone = ser.validated_data["phone"]

        if "vk_url" in ser.validated_data:
            profile.vk_url = ser.validated_data["vk_url"]

        if any(k in ser.validated_data for k in ("birth_date", "phone", "vk_url")):
            profile.save(
                update_fields=[
                    f
                    for f in ("birth_date", "phone", "vk_url")
                    if f in ser.validated_data
                ]
            )
            if "vk_url" in ser.validated_data:
                sync_profile_vk(profile)

        return Response(_me_payload(user))

    def delete(self, request, *args, **kwargs):
        if request.user.is_staff:
            return Response(
                {"detail": "Аккаунт администратора нельзя удалить через сайт."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ser = AccountDeleteSerializer(data=request.data, context={"request": request})
        ser.is_valid(raise_exception=True)

        user = request.user
        Token.objects.filter(user=user).delete()
        user.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
