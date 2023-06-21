from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header="Presense Admin"
admin.site.index_title="Admin"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("users/", include("users.urls")),
    path("face-ml/", include("face_ml.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
