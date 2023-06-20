from django.db import models
from django.contrib.auth.models import User
from django.utils.html import mark_safe

class UserAttendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    month = models.IntegerField()
    year = models.IntegerField()
    streak = models.IntegerField()
    attendance = models.JSONField()

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.CharField(max_length=2)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    image = models.ImageField(
        upload_to="student_images",
       )
    action = models.BooleanField()
    
    def img_preview(self): 
        return mark_safe(f'<img src = "{self.image.url}" width = "100" height="100"/>')

    def __str__(self) -> str:
        return self.name 

    class Meta:
        ordering = ['name']
    