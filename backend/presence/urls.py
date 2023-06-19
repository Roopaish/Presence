from django.contrib import admin
from django.urls import path, include
admin.site.site_header="Presense Admin"
admin.site.index_title="Admin"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("users/", include("users.urls")),
    path("authority/", include("authority.urls")),
]
