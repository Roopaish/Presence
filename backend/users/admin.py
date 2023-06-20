from django.contrib import admin

from . import models 

@admin.register(models.Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'avatar', 'email','img_preview']
    list_editable = ['email']
    list_per_page = 10
    search_fields = ['name__istartswith']
    

# Register your models here.
 