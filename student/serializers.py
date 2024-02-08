from rest_framework import serializers
from .models import (
    Session, 
    Semester, 
    Experience, 
    Student,
    Course,
    Department,
    Faculty,
)

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['experience', 'semester_photo1', 'semester_photo2']

class StudentSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = Student
        fields = '__all__'

class StudentUpdateSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = Student
        exclude = ('user', 'reg_number')


# serializers.py

class AlmanacSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = Student
        fields = [
            'id',
            'reg_number', 
            'first_name', 
            'last_name', 
            'email', 
            'current_level', 
            'graduation_year', 
            'course',
            ]
