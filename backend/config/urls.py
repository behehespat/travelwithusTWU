from django.contrib import admin
from django.urls import include, path

from config.views import backend_home

urlpatterns = [
    path("", backend_home),
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
]
