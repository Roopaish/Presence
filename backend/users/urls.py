from django.urls import path
from users import views

urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('login', views.user_login, name='login'),
    path('logout', views.user_logout, name='logout'),
    path('me', views.get_current_user, name='me'),
    path('forgot-password', views.forgot_password, name='forgot_password'),
    path('reset-password/<uidb64>/<token>',
         views.reset_password, name='reset_password'),
    path('login/google', views.google_login, name='google_login'),
]
