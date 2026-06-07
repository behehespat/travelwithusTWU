from django.contrib.auth.models import User
from django.db import models


def default_places():
    return []


class Tour(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration_days = models.PositiveSmallIntegerField()
    tariff_label = models.CharField(max_length=64, default="Базовый тариф")
    image_url = models.URLField(max_length=500)
    sort_order = models.PositiveSmallIntegerField(default=0)
    price_from_rub = models.PositiveIntegerField(
        default=0,
        help_text="Стоимость «от», руб. за человека (ориентир для лендинга).",
    )
    dates_display = models.CharField(
        max_length=500,
        blank=True,
        help_text="Текстовое описание выездных дат для сайта.",
    )
    places = models.JSONField(default=default_places)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self) -> str:
        return self.title


class FAQItem(models.Model):
    question = models.CharField(max_length=500)
    answer = models.TextField()
    sort_order = models.PositiveSmallIntegerField(default=0)
    column = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self) -> str:
        return self.question[:60]


class Testimonial(models.Model):
    name = models.CharField(max_length=120)
    text = models.TextField()
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self) -> str:
        return self.name


class LeadSubmission(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=64)
    telegram = models.CharField(max_length=200, blank=True)
    policy_accepted = models.BooleanField()
    personal_data_accepted = models.BooleanField()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} @ {self.created_at:%Y-%m-%d}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=32, blank=True, default="")
    vk_url = models.CharField("Ссылка ВКонтакте", max_length=500, blank=True, default="")
    vk_user_id = models.BigIntegerField("VK user id", null=True, blank=True, db_index=True)
    vk_first_name = models.CharField(max_length=120, blank=True, default="")
    vk_last_name = models.CharField(max_length=120, blank=True, default="")

    def __str__(self) -> str:
        return f"Profile({self.user.username})"


class TourBooking(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Новая"
        IN_PROGRESS = "in_progress", "В процессе"
        REVIEWED = "reviewed", "Рассмотрена"

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tour_bookings")
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="bookings")
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)
    vk_notified_at = models.DateTimeField("VK: отправлено", null=True, blank=True)
    vk_notify_error = models.TextField("VK: ошибка", blank=True, default="")

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(fields=["user", "tour"], name="uniq_tourbooking_user_tour"),
        ]

    def __str__(self) -> str:
        return f"{self.user.username} → {self.tour.slug} ({self.status})"
