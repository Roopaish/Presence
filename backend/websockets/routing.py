from django.urls import re_path 
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/logs', consumers.LogsConsumer.as_asgi()),
    re_path(r'ws/status', consumers.StatusConsumer.as_asgi()),
    re_path(r'ws/attendance', consumers.AttendanceConsumer.as_asgi())
]