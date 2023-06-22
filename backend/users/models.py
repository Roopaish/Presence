from django.db import models
from django.contrib.auth.models import User

class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day = models.IntegerField()
    month = models.IntegerField()
    year = models.IntegerField()
    streak = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'day', 'month', 'year')
