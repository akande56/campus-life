from django.contrib import admin
from .models import (
    University, 
    Student,
    Faculty,
    Department,
    Semester,
    Session
)

admin.site.register(University)
admin.site.register(Student)
admin.site.register(Faculty)
admin.site.register(Department)
admin.site.register(Semester)
admin.site.register(Session)