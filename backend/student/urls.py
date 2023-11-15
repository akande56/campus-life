from django.urls import path
from .views import (
    verify_and_create_user,
    StudentDetailView,
    update_student,
    semesters_list_view,
    sessions_list_view, 
    semester_experience,
    get_student_experiences,
    get_semester_experiences,
    get_session_experiences,
    almanac_view,
    course_almanac_view,
    faculty_almanac_view,
    department_almanac_view,
    all_students,
    faculty_students,
    department_students,
    course_students,
    level_students,
    FacultyListView,
    DepartmentListView,
    CourseListView,
)

urlpatterns = [
    #student
    path('verify_and_create_user/', verify_and_create_user, name='verify_and_create_user'),
    path('detail/<int:id>/', StudentDetailView.as_view(), name='student-detail'),
    path('update/<str:user_id>/', update_student, name = 'update_student'),
    #Session/semester/experience
    path('session_list/', sessions_list_view, name ='session_list'),
    path('semester_list/<int:session_id>/', semesters_list_view, name = 'semester_list'),
    path('semester/<int:semester_id>/experiences/', semester_experience, name = 'new_experience'),
    path('<str:user_id>/experiences/', get_student_experiences, name='get_student_experiences'),
    path('session/<int:session_id>/experiences/', get_session_experiences, name='get_session_experiences'),
    path('semester/<int:semester_id>/experiences/', get_semester_experiences, name='get_semester_experiences'),
    #almanac
    path('almanac/all_graduation_year_student/', almanac_view, name='all_graduation_student_almanac'),
    path('almanac/faculty_graduation_student/', faculty_almanac_view, name='faculty_unit_almanac'),
    path('almanc/course_graduation_student/', course_almanac_view, name='course_unit_alamanc'),
    path('almanac/department_graduation_student/', department_almanac_view, name='department_unit_almanac'),
    #faculty/department/course/student
    path('faculties/', FacultyListView.as_view(), name='faculty-list'),
    path('departments/', DepartmentListView.as_view(), name='department-list'),
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('all/', all_students, name='all-students'),
    path('faculty/<int:faculty_id>/', faculty_students, name='faculty-students'),
    path('department/<int:department_id>/', department_students, name='department-students'),
    path('course/<int:course_id>/', course_students, name='course-students'),
    path('level/<int:course_id>/<str:level>/', level_students, name='level-students'),   
]