from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from rest_framework.authtoken.models import Token

from django.middleware import csrf
from django.http import JsonResponse, HttpResponse
from reportlab.pdfgen import canvas
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
from drf_spectacular.utils import extend_schema, OpenApiParameter
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



@extend_schema(
     description=" Note: Execution may lead to error when running here in the docs(Due to Swagger UI or ReDoc); everything is working when actual running with\
      httpie and curl.The view handles creation of both new user (User Object) and student (Student Object). It uses information gotten from the school database.\
         to populate student data. \ Note: email will be saved as username, while reg_number will be saved as password \
        for the User object... thus what is needed in subsequent login. After login, a token will be generated which needs to be saved in the client browser\
        for future authentication. During authentication, if the token has expired, the user needs to log in again to obtain a new token.",
    parameters=[
        OpenApiParameter(name="email", type=str, description="Student email."),
        OpenApiParameter(name='reg_number', type=str, description='student school registration number')
    ],
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

#...................................................................................................

@extend_schema(
    description="Retrieve details of a specific student.",
    parameters=[
        {
            "name": "id",
            "required": True,
            "in": "path",
            "description": "The ID of the student to retrieve.",
            "type": "integer",
        }
    ],
    responses={200: StudentSerializer},
)
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

#......................................................................

@extend_schema(
    description="Update details of a specific student.",
    parameters=[
        {
            "name": "user_id",
            "required": True,
            "in": "path",
            "description": "The user ID of the student to update.",
            "type": "string",
        }
    ],
    request=StudentSerializer,
    responses={200: StudentSerializer},
)
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

#...................................................................

@api_view(['GET'])
@authentication_classes([TokenAuthentication])  # Ensure user authentication
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def sessions_list_view(request):
    sessions = Session.objects.all()
    serializer = SessionSerializer(sessions, many=True)
    return Response(serializer.data)

#...................................................................

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def semesters_list_view(request, session_id):
    semesters = Semester.objects.filter(session_id=session_id)
    serializer = SemesterSerializer(semesters, many=True)
    return Response(serializer.data)

#...................................................................


@extend_schema(
    description="Create a new experience for the current semester and student. NOTE: don't forget to add multipart-form in the request",
    request=ExperienceSerializer,
    responses={201: ExperienceSerializer, 400: "Bad Request"},
)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def semester_experience(request):
    print('view')
    print(request.data)
    # Fetching student data using the provided token
    student = Student.objects.get(user=request.user)

    # Automatically determining the current semester (you need to implement this logic)
    current_semester = Semester.objects.get(current_semester=True)

    # Check if the student already has an experience for the current semester
    existing_experience = Experience.objects.filter(student=student, semester=current_semester).first()
    if existing_experience:
        return Response("Student has already uploaded an experience for this semester.", status=status.HTTP_400_BAD_REQUEST)

    serializer = ExperienceSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        # Create the Experience object
        experience = serializer.save()

        # Set the related fields
        experience.student = student
        experience.semester = current_semester
        experience.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#.....................................................................

@extend_schema(
    description="Retrieve the list of experiences (current semester) for a specific student. Include Authentication token header",
    
    responses={200: ExperienceSerializer(many=True), 404: "Not Found"},
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_student_experiences(request):
    student = Student.objects.get(user=request.user)
    semester = Semester.objects.get(current_semester=True)
    experiences = Experience.objects.filter(student=student, semester=semester) 
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)

#........................................................................

@extend_schema(
    description="Retrieve the list of experiences for the current user in a specific session.",
    parameters=[OpenApiParameter(name="session_id", type=int, description="ID of the session.")],
    responses={200: ExperienceSerializer(many=True), 404: "Not Found"},
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_session_experiences(request, session_id):
    user = request.user  # Get the current authenticated user

    try:
        session = Session.objects.get(id=session_id)
    except Session.DoesNotExist:
        return Response("Session not found", status=status.HTTP_404_NOT_FOUND)

    student = Student.objects.get(user=user)

    # Filter experiences based on the user and session
    experiences = Experience.objects.filter(semester__session=session, student=student)
    serializer = ExperienceSerializer(experiences, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


# ........................................................................

@extend_schema(
    description="Retrieve the list of experiences for the current user in a specific semester.",
    parameters=[OpenApiParameter(name="semester_id", type=int, description="ID of the semester.")],
    responses={200: ExperienceSerializer(many=True), 404: "Not Found"},
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_semester_experiences(request, semester_id):
    user = request.user  # Get the current authenticated user

    try:
        semester = Semester.objects.get(id=semester_id)
    except Semester.DoesNotExist:
        return Response("Semester not found", status=status.HTTP_404_NOT_FOUND)

    student = Student.objects.get(user=user)

    # Filter experiences based on the user and semester
    experiences = Experience.objects.filter(semester=semester, student=student)
    serializer = ExperienceSerializer(experiences, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


#.........................................................................ALMANAC...................................

## Almanac for all student of same graudation year
@extend_schema(
    description="Retrieve the almanac for all graduation year students. \
        Note: response will be based on logged in user/Requesting user. i.e base on graduation year of the requesting user. \
        Note(hint): in the response there is the user_id which can be used to get all experiences for particular student",
    responses={200: AlmanacSerializer(many=True), 404: "Not Found"},
)
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

# ....................................................................................

#Almanac for all student of same graduation of the same faculty
@extend_schema(
    description="Retrieve the almanac for faculty graduation year students.",
    parameters=[
        OpenApiParameter(name="faculty_id", type=int, description="ID of the faculty."),
    ],
    responses={200: AlmanacSerializer(many=True), 404: "Not Found"},
)
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


# .................................................................................

#Almanac for all student of same graduation of the same department
@extend_schema(
    description="Retrieve the almanac for department graduation year students. \
        Note result will be based on logged in user/Requesting user. i.e base on graduation year of the requesting user. \
        Note(hint): in the response there is the user_id which can be used to get all experiences for particular student.",
    parameters=[
        OpenApiParameter(name="department_id", type=int, description="ID of the department."),
    ],
    responses={200: AlmanacSerializer(many=True), 404: "Not Found"},
)
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


#. ....................................................................................

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

#...............................................................................
# ................. faculty, department and course LIST ........................
#................................................................................

class FacultyListView(ListAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

class DepartmentListView(ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class CourseListView(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# ...................................................................................

# ...................................................................................................
# ................. List of students in Faculty, department and course ..............................
# ...................................................................................................
@extend_schema(
    description="Retrieve the list of all students.",
    responses={200: StudentSerializer(many=True), 404: "Not Found"},
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def all_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=200)

#,.....................................................................................

@extend_schema(
    description="Retrieve the list of students for a specific faculty.",
    parameters=[
        OpenApiParameter(name="faculty_id", type=int, description="ID of the faculty."),
    ],
    responses={200: StudentSerializer(many=True), 404: "Not Found"},
)
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

# .........................................................................................

@extend_schema(
    description="Retrieve the list of students for a specific department.",
    parameters=[
        OpenApiParameter(name="department_id", type=int, description="ID of the department."),
    ],
    responses={200: StudentSerializer(many=True), 404: "Not Found"},
)
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

#.........................................................................................

@extend_schema(
    description="Retrieve the list of students for a specific course.",
    parameters=[
        OpenApiParameter(name="course_id", type=int, description="ID of the course."),
    ],
    responses={200: StudentSerializer(many=True), 404: "Not Found"},
)
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

# ............................................................................................

@extend_schema(
    description="Retrieve the list of students for a specific course and level.",
    parameters=[
        OpenApiParameter(name="course_id", type=int, description="ID of the course."),
        OpenApiParameter(name="current_level", type=str, description="Level of the students."),
    ],
    responses={200: StudentSerializer(many=True), 404: "Not Found"},
)
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



def get_csrf_token(request):
    token = csrf.get_token(request)
    return JsonResponse({'csrf_token': token})

@csrf_exempt
@require_POST
def custom_obtain_auth_token(request):
    # Your authentication logic here
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Authentication successful, generate a new CSRF token
        csrf_token = get_token(request)

        # Generate or retrieve the user's token
        token, created = Token.objects.get_or_create(user=user)

        # Access the token value
        token_value = token.key

        # Respond with the CSRF token and the actual authentication token
        response_data = {'token': token_value, 'csrf_token': csrf_token}
        response = JsonResponse(response_data)

        # Set CORS headers
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'  # Adjust with your React frontend URL
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'accept, authorization, content-type'
        response['Access-Control-Allow-Credentials'] = 'true'

        return response
    else:
        # Authentication failed
        return JsonResponse({'error': 'Invalid credentials'}, status=400)



######################################## GENERATE PDF ##########################################
@extend_schema(
    description="Generate an album for a specific student in a given semester, returns pdf",
    parameters=[
        {
            "name": "semester_id",
            "in": "path",
            "description": "ID of the semester",
            "required": True,
            "type": "integer",
        },
        {
            "name": "student_id",
            "in": "path",
            "description": "ID of the student",
            "required": True,
            "type": "integer",
        },
    ],
    responses={200: "application/pdf"},
)
@api_view(['GET'])
@authentication_classes([SessionAuthentication])  
@permission_classes([AllowAny])
def generate_album(request, semester_id, student_id):
    # Get the student
    student = get_object_or_404(Student, id=student_id)

    # Determine course and level
    course = student.course
    level = student.current_level

    # Get all students in the same course and level
    students = Student.objects.filter(course=course, current_level=level)

    # Get all experiences for the selected students in the given semester
    experiences = Experience.objects.filter(student__in=students, semester=semester_id)

    # Create PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'filename=student_album_{student.first_name}_{student.last_name}.pdf'

    # Create the PDF object
    pdf = canvas.Canvas(response)

    # Add content to the PDF
    pdf.drawString(100, 800, f"ABUBAKAR TAFAWA BALEWA UNIVERSITY - STUDENT SESSION ALBUM")
    pdf.drawString(100, 780, f"Album for {student.first_name} {student.last_name} - Semester {semester_id}")

    y_position = 700  # Starting Y position for content
    x_position = 100  # Starting X position for content

    for i, exp in enumerate(experiences):
        # Add student name and phone number to the PDF
        pdf.drawString(x_position, y_position - 60, f"Name: {exp.student.first_name} {exp.student.last_name}")
        # pdf.drawString(x_position, y_position - 15, f"Phone: {exp.student.phone_number}")

        # Add pictures to the PDF
        if exp.semester_photo1:
            image_path1 = exp.semester_photo1.path
            pdf.drawInlineImage(image_path1, x_position, y_position - 40, width=80, height=80)

        if exp.semester_photo2:
            image_path2 = exp.semester_photo2.path
            pdf.drawInlineImage(image_path2, x_position + 100, y_position - 40, width=80, height=80)

        x_position += 250  # Adjust X position for the next student

        # Move to the next row after two students
        if (i + 1) % 2 == 0:
            x_position = 100
            y_position -= 180  # Adjust Y position for the next row

        pdf.drawString(x_position, y_position - 160, "-" * 50)  # Separating line

    # Save the PDF content
    pdf.save()

    return response