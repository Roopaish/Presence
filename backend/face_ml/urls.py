from django.urls import path
from face_ml import views

urlpatterns = [
    path('encode-images', views.encode_images, name='encode_images'),
    path('take-attendance', views.take_attendance, name='take_attendance'),
    path('stop-taking-attendance', views.stop_video_stream, name='stop_video_stream'),
]
