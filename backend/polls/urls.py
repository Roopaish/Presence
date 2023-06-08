from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('random_number/<int:seed>/', views.generate_random_number, name='generate_random_number'),
]
