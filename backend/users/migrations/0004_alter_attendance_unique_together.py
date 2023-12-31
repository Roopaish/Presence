# Generated by Django 4.2.2 on 2023-06-22 07:49

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0003_alter_attendance_streak'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='attendance',
            unique_together={('user', 'day', 'month', 'year')},
        ),
    ]
