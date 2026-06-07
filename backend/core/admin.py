from django.contrib import admin

from .models import FAQItem, LeadSubmission, Testimonial, Tour, TourBooking, UserProfile


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ("title", "duration_days", "sort_order", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ("question", "column", "sort_order")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "sort_order")


@admin.register(LeadSubmission)
class LeadSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "created_at")
    readonly_fields = ("created_at",)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "vk_user_id", "phone", "vk_url")
    search_fields = ("user__username", "vk_url")
    readonly_fields = ("vk_user_id", "vk_first_name", "vk_last_name")


@admin.register(TourBooking)
class TourBookingAdmin(admin.ModelAdmin):
    list_display = ("user", "tour", "status", "vk_notified_at", "created_at")
    list_filter = ("status",)
    readonly_fields = ("created_at", "vk_notified_at", "vk_notify_error")
    search_fields = ("user__username", "tour__title", "tour__slug")
