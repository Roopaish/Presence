from django.urls import path
from authority import views

urlpatterns = [
    path('encode-images', views.encode_images, name='encode_images'),
]
