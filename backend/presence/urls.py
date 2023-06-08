from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Presence API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("polls/", include("polls.urls")),
    re_path(r'^$', schema_view),
]
