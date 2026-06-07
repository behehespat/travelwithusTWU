import logging

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .password_reset import send_password_reset_email
from .serializers_password_reset import PasswordResetConfirmSerializer, PasswordResetRequestSerializer

logger = logging.getLogger(__name__)

GENERIC_RESET_MESSAGE = (
    "Если аккаунт с таким email зарегистрирован, мы отправили инструкцию по сбросу пароля."
)


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        ser = PasswordResetRequestSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        email = ser.validated_data["email"].strip().lower()

        users = User.objects.filter(email__iexact=email, is_active=True)
        for user in users:
            if send_password_reset_email(user):
                break
            else:
                logger.warning("password reset email not sent for user_id=%s", user.pk)

        return Response({"detail": GENERIC_RESET_MESSAGE}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        ser = PasswordResetConfirmSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user = ser.validated_data["user"]
        user.set_password(ser.validated_data["password"])
        user.save(update_fields=["password"])
        Token.objects.filter(user=user).delete()
        return Response(
            {"detail": "Пароль успешно изменён. Теперь можно войти с новым паролем."},
            status=status.HTTP_200_OK,
        )
