from django.db import models
from compus_life.users.models import User

class University(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    state = models.CharField(max_length=50)

    class Meta:
        """Meta definition for University."""

        verbose_name = 'University'
        verbose_name_plural = 'Universities'
    
    def __str__(self):
        return str(self.name)


class Session(models.Model):
    title = models.CharField(max_length=50)
    active_session = models.BooleanField()
    year = models.PositiveIntegerField(help_text='e.g. 2023')

    class Meta:
        """Meta definition for Session."""

        verbose_name = 'Session'
        verbose_name_plural = 'Sessions'

    def __str__(self):
        return str(self.title)


class Semester(models.Model):
    title = models.CharField(max_length=50)
    current_semester = models.BooleanField()
    start_date = models.DateField()
    end_date = models.DateField()
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    
    class Meta:
        """Meta definition for Semester."""

        verbose_name = 'Semester'
        verbose_name_plural = 'Semesters'
    def __str__(self):
        return f"{self.title} ({self.session.title})"


class Faculty(models.Model):
    name = models.CharField(max_length=100)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    
    class Meta:
        """Meta definition for Faculty."""

        verbose_name = 'Faculty'
        verbose_name_plural = 'Faculties'
    def __str__(self):
        return str(self.name)


class Department(models.Model):
    name = models.CharField(max_length=100)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    
    class Meta:
        """Meta definition for Department."""

        verbose_name = 'Department'
        verbose_name_plural = 'Departments'
    def __str__(self):
        return str(self.name)


class Course(models.Model):
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    class Meta:
        """Meta definition for Course."""

        verbose_name = 'Course'
        verbose_name_plural = 'Courses'
    def __str__(self):
        return str(self.name)


class Student(models.Model):
    reg_number = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    surname = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    current_level = models.CharField( max_length=50, blank=True)
    # phone = models.PhoneNumberField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=True)
    graduation_year = models.PositiveIntegerField(help_text='e.g. 2023', blank=True)
    
    class Meta:
        """Meta definition for Student."""

        verbose_name = 'Student'
        verbose_name_plural = 'Students'
    def __str__(self):
        return f"{self.first_name} {self.last_name}"



class Experience(models.Model):
    """Model definition for Experience."""

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    experience = models.CharField(max_length=500)
    semester_photo1 = models.ImageField(upload_to='anual_semester_photo', null=True)
    semester_photo2 = models.ImageField(upload_to='anual_semester_photo', null=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)


    class Meta:
        """Meta definition for Experience."""

        verbose_name = 'Experience'
        verbose_name_plural = 'Experiences'

    def __str__(self):
        """Unicode representation of MODELNAME."""
        return f"{self.student.reg_number} {self.semester}"


# class Almanac(models.Model):
#     """Model definition for Almanac."""

#     title = models.CharField(max_length=50)
#     session = models.ForeignKey(Session, on_delete=models.CASCADE)


#     class Meta:
#         """Meta definition for Almanac."""

#         verbose_name = 'Almanac'
#         verbose_name_plural = 'Almanacs'

#     def __str__(self):
#         """Unicode representation of Almanac."""
#         pass
