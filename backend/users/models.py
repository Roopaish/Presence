from django.db import models
from django.contrib.auth.models import User
from django.utils.html import mark_safe

class UserAttendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    month = models.IntegerField()
    year = models.IntegerField()
    streak = models.IntegerField()
    attendance = models.JSONField()
