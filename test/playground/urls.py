from django.urls import path
from . import views

urlpatterns = [
    path('hello', views.hello),
    path('hello2', views.hello2),
    path('save_images', views.save_images)
]
