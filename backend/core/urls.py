from django.urls import path

from .views import (
    FAQListView,
    LeadCreateView,
    TestimonialListView,
    TourDetailView,
    TourListView,
)
from .views_admin import AdminBookingDetailView, AdminBookingsListView
from .views_auth import LoginView, MeView, RegisterView
from .views_booking import TourBookingCreateView
from .views_password_reset import PasswordResetConfirmView, PasswordResetRequestView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/me/", MeView.as_view(), name="auth-me"),
    path("auth/password-reset/", PasswordResetRequestView.as_view(), name="auth-password-reset"),
    path("auth/password-reset/confirm/", PasswordResetConfirmView.as_view(), name="auth-password-reset-confirm"),
    path("bookings/", TourBookingCreateView.as_view(), name="tour-booking-create"),
    path("admin/bookings/", AdminBookingsListView.as_view(), name="admin-bookings-list"),
    path("admin/bookings/<int:booking_id>/", AdminBookingDetailView.as_view(), name="admin-booking-detail"),
    path("tours/<slug:slug>/", TourDetailView.as_view(), name="tour-detail"),
    path("tours/", TourListView.as_view(), name="tour-list"),
    path("faqs/", FAQListView.as_view(), name="faq-list"),
    path("testimonials/", TestimonialListView.as_view(), name="testimonial-list"),
    path("leads/", LeadCreateView.as_view(), name="lead-create"),
]
