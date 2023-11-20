from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import (
    SessionAuthentication, 
    TokenAuthentication,
)
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import (
    AllowAny, 
    IsAuthenticated,
)

from compus_life.users.models import User

from .models import (
    Student,
    Course,
    Department,
    Faculty,
    University,
    Session,
    Semester,
    Experience,
)

from .serializers import (
    SessionSerializer,
    SemesterSerializer,
    ExperienceSerializer,
    StudentUpdateSerializer,
    AlmanacSerializer,
    StudentSerializer,
    FacultySerializer,
    DepartmentSerializer,
    CourseSerializer,
)


@api_view(['POST'])
@authentication_classes([SessionAuthentication])  # Exempting authentication for this view
@permission_classes([AllowAny])  # Allowing any permission for this view
def verify_and_create_user(request):
    university_object = University.objects.first()
    # Example: Verification logic with the school API
    # ... (retrieve student data and verification)
    
    reg_number = request.data.get('reg_number')
    email = request.data.get('email')

    # Assuming student_data is fetched from the school API
    student_data = {
        'reg_num': reg_number,
        'email': email,
        'course': 'Computer Science',
        'faculty': 'Faculty of Science',
        'department': 'Computer Science Department',
        'username': email,
        'password': reg_number,
        'first_name': 'bogo',
        'last_name': 'bogus',
        'surname': 'bogus',
        'current_level' : '100',
        
    }

    if student_data:
        # Extract necessary data
        student_course = student_data['course']
        student_faculty = student_data['faculty']
        student_department = student_data['department']
        
        # Check if entities exist, else create
        faculty, created = Faculty.objects.get_or_create(name=student_faculty, university=university_object)
        department, created = Department.objects.get_or_create(name=student_department, faculty=faculty)
        course, created = Course.objects.get_or_create(name=student_course, department=department)
        
        # Assuming other necessary data for user creation
        user_data = {
            
            'email': student_data['email'],
            'password': student_data['reg_num'],
            # Other user-related data
        }

        # Create or update student record
        student, created = Student.objects.get_or_create(
            first_name=student_data['first_name'],
            last_name=student_data['last_name'],
            surname = student_data['surname'],
            course=course,
            reg_number = reg_number,
            email = student_data['email'],
            graduation_year = 0000,
        )

        if created:  # If student was created/updated
            # Create a new user
            user = User.objects.create_user(**user_data)
            # Update the Student model with the created user
            user.save()
            student.user = user
            student.save()

            return Response("Student verified, record created, and user created", status=status.HTTP_200_OK)
        else:
            student.current_level = student_data['current_level']
            return Response("Student record already exists, record UPDATED", status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Student verification failed", status=status.HTTP_400_BAD_REQUEST)


class StudentDetailView(RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    def get_object(self):
        id = self.kwargs.get('id')
        try:
            return Student.objects.get(id=id)
        except Student.DoesNotExist:
            raise Http404("Student not found")


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_student(request, user_id):
    try:
        student = Student.objects.get(user__id=user_id)  # Access student using the user's ID
    except Student.DoesNotExist:
        return Response(status=404)  # Return 404 if student doesn't exist

    serializer = StudentUpdateSerializer(student, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])  # Ensure user authentication
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def sessions_list_view(request):
    sessions = Session.objects.all()
    serializer = SessionSerializer(sessions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def semesters_list_view(request, session_id):
    semesters = Semester.objects.filter(session_id=session_id)
    serializer = SemesterSerializer(semesters, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def semester_experience(request, semester_id):
    student_id = request.data.get('student')  # Get student ID from the request data
    semester = Semester.objects.get(id=semester_id)  # Retrieve the Semester object

    # Check if the student already has an experience for this semester
    existing_experience = Experience.objects.filter(student__id=student_id, semester=semester).first()
    if existing_experience:
        return Response("Student has already uploaded an experience for this semester.", status=status.HTTP_400_BAD_REQUEST)

    serializer = ExperienceSerializer(data=request.data)

    if serializer.is_valid():
        experience = serializer.save()

        student = Student.objects.get(id=student_id)
        experience.student = student
        experience.semester = semester
        experience.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([SessionAuthentication])  # Exempting authentication for this view
@permission_classes([AllowAny])  # Allowing any permission for this view
def get_student_experiences(request, user_id):
    experiences = Experience.objects.filter(student__user__id=user_id)  # Fetch experiences for the given user_id
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_session_experiences(request, session_id):
    experiences = Experience.objects.filter(semester__session_id=session_id)
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_semester_experiences(request, semester_id):
    experiences = Experience.objects.filter(semester_id=semester_id)
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)





# Almanac for all student of same graudation year
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def almanac_view(request):
    user = request.user
    try:
        student = Student.objects.get(user=user)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve data based on the student's information
    graduation_year = student.graduation_year

    # Retrieve all 500 level students
    all_students_500 = Student.objects.filter(current_level='500', graduation_year=graduation_year)

    serializer_all_students = AlmanacSerializer(all_students_500, many=True)

    almanac_data = {
        'all_students_500_almanac': serializer_all_students.data,
    }

    return Response(almanac_data)


#Almanac for all student of same graduation of the same faculty
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def faculty_almanac_view(request):
    user = request.user
    try:
        student = Student.objects.get(user=user)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve data based on the student's faculty
    faculty_id = student.faculty.id
    all_students_faculty = Student.objects.filter(faculty=faculty_id, current_level='500')

    serializer_faculty = AlmanacSerializer(all_students_faculty, many=True)

    almanac_data_faculty = {
        'faculty_almanac': serializer_faculty.data,
    }

    return Response(almanac_data_faculty)


#Almanac for all student of same graduation of the same department
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def department_almanac_view(request):
    user = request.user
    try:
        student = Student.objects.get(user=user)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve data based on the student's department
    department_id = student.department.id
    all_students_department = Student.objects.filter(department=department_id, current_level='500')

    serializer_department = AlmanacSerializer(all_students_department, many=True)

    almanac_data_department = {
        'department_almanac': serializer_department.data,
    }

    return Response(almanac_data_department)


#Almanac for all student of same graduation of the same course
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def course_almanac_view(request):
    user = request.user
    student = Student.objects.get(user=user)

    # Retrieve data based on the student's course
    course_id = student.course.id
    all_students_course = Student.objects.filter(course=course_id, current_level='500')

    serializer_course = AlmanacSerializer(all_students_course, many=True)

    almanac_data_course = {
        'course_almanac': serializer_course.data,
    }

    return Response(almanac_data_course)

########## faculty, department and course LIST ################
class FacultyListView(ListAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

class DepartmentListView(ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class CourseListView(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

################### Faculty, department and course for STUDENT ##############################
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def all_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def faculty_students(request, faculty_id):
    try:
        faculty = Faculty.objects.get(id=faculty_id)
        students = Student.objects.filter(faculty=faculty)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=200)
    except Faculty.DoesNotExist:
        return Response("Faculty not found", status=404)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def department_students(request, department_id):
    try:
        department = Department.objects.get(id=department_id)
        students = Student.objects.filter(department=department)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=200)
    except Department.DoesNotExist:
        return Response("Department not found", status=404)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def course_students(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        students = Student.objects.filter(course=course)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=200)
    except Course.DoesNotExist:
        return Response("Course not found", status=404)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def level_students(request, course_id ,level):
    try:
        course = Course.objects.get(id=course_id)
        students = Student.objects.filter(course=course, current_level = level)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=200)
    except Course.DoesNotExist:
        return Response("Course not found", status=404)