# Student App API Documentation
# ****************  after the last '/' what follows are parameters for the POST/GET?PUT request, as for #                   'Authoization: Token... ' is the http header
#                   paramter within '/...e.g id=1/' are url parameters
#                   
# ***********************

## 1. Verify and Create User
The view handles creation of both new user and student. it uses information gotten from the school database to populate student data.
**Note: email will be saved as username for the User object, while reg_number will be saved as password for the User object... thus what is needed in subsequest login** 
Upon success Token will be generated for the user for future login and other authentication request.

`Endpoint: api/v1/student/verify_and_create_user/`
Method: POST
Parameters:
reg_number (string): Registration number of the student.
email (string): Email address of the student.
Token Header Required: No

**Request**:
http POST http://localhost:8000/api/v1/student/verify_and_create_user/ 
parameter: reg_number="your_reg_number" email="your_email@example.com"
**Response**:
{
    "message": "User verification successful. User created.",
    "user_id": "user_id_here"
}


## 2. Student Detail
Retrieve details of a specific student by ID.

`Endpoint: api/v1/student/detail/<int:id>/`
Method: GET

Parameters:
id (integer): ID of the student.
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/detail/1/ "Authorization: Token <your_token_here>"
**NOte: Token is in the header
**Response**
{
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "reg_number": "12345",
    "current_level": "500",
    "course": "Computer Science",
    "faculty": "Engineering",
    "department": "Computer Science",
    "session": "2022/2023",
    "user_id": "***********"
}


## 3. Update Student
 Update details of a specific student by user ID.

`Endpoint: api/v1/student/update/<str:user_id>/`
Method: PUT
Parameters:
user_id (string): User ID of the student.
Token Header Required: Yes

**Request**
http PUT http://localhost:8000/api/v1/student/update/user_id_here/ "Authorization: Token <your_token_here>" 

Parameter:first_name="John" last_name="Doe" email="john.doe@example.com" current_level="500" course="Computer Science"

**Response**
{
    "message": "Student details updated successfully.",
    "user_id": "user_id_here"
}


## 4. Session List
Description: Retrieve a list of sessions.

`Endpoint: api/v1/student/session_list/`
Method: GET
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/session_list/ "Authorization: Token your_token_here"
**Response**
[
    {
        "id": 1,
        "title": "2022/2023",
        "active_session": true
    },
    {
        "id": 2,
        "title": "2023/2024",
        "active_session": false
    }
]


## 5. Semester List
`Endpoint: api/v1/student/semester_list/<int:session_id>/`
Method: GET
Description: Retrieve a list of semesters for a specific session.
Parameters:
session_id (integer): ID of the session.
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/semester_list/1/ "Authorization: Token your_token_here"

**Response**
[
    {
        "id": 1,
        "title": "First Semester",
        "current_semester": true,
        "start_date": "2022-09-01",
        "end_date": "2022-12-31"
    },
    {
        "id": 2,
        "title": "Second Semester",
        "current_semester": false,
        "start_date": "2023-01-01",
        "end_date": "2023-04-30"
    }
]

## 6. New Experience
`Endpoint: api/v1/student/semester/experience/`
Method: POST
Description: Create a new experience for a specific semester (student).
Parameters:
semester_id (integer): ID of the semester.
Token Header Required: Yes
**NOTE: dont forget to add multipart or form in the request**
**Request**
http --form POST http://localhost:8000/api/v1/student/semester/experience/ "Authorization: Token <your_token_here>" 
Parameter:  experience="Details for the experience" semester_photo1@/path/to/photo1.jpg semester_photo2@/path/to/photo2.jpg
**Response**
{
    "id": 1,
    "experience": "Details for the experience",
    "semester_photo1": "/media/anual_semester_photo/photo1.jpg",
    "semester_photo2": "/media/anual_semester_photo/photo2.jpg",
}


## 7. Get Student Experiences
`Endpoint: api/v1/student/<str:user_id>/experiences/`
Method: GET
Description: Retrieve experiences for a specific student.
Parameters:
user_id (string): User ID of the student.
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/user_id_here/experiences/ "Authorization: Token <your_token_here>"
**Response**
[
    {
        "id": 1,
        "student": "user_id_here",
        "experience": "Details for the experience",
        "semester_photo1": "/media/anual_semester_photo/photo1.jpg",
        "semester_photo2": "/media/anual_semester_photo/photo2.jpg",
        "semester": 1
    },
    {
        "id": 2,
        "student": "user_id_here",
        "experience": "Another experience",
        "semester_photo1": "/media/anual_semester_photo/photo3.jpg",
        "semester_photo2": "/media/anual_semester_photo/photo4.jpg",
        "semester": 2
    }
]


## 8. Get Session Experiences
`Endpoint: api/v1/student/session/<int:session_id>/experiences/`
Method: GET
Description: Retrieve the list of experiences for the current user in a specific session.
Parameters:
session_id (integer): ID of the session.
Token Header Required: Yes
**Request**
http GET http://localhost:8000/api/v1/student/session/1/experiences/ "Authorization: Token <your_token_here>"
**Response**
[
    {
        "id": 1,
        "student": "user_id_here",
        "experience": "Details for the experience",
        "semester_photo1": "/media/anual_semester_photo/photo1.jpg",
        "semester_photo2": "/media/anual_semester_photo/photo2.jpg",
        "semester": 1
    },
    {
        "id": 3,
        "student": "another_user_id",
        "experience": "Experience in the second semester",
        "semester_photo1": "/media/anual_semester_photo/photo5.jpg",
        "semester_photo2": "/media/anual_semester_photo/photo6.jpg",
        "semester": 2
    }
]

## 9. Get Semester Experiences
`Endpoint: api/v1/student/semester/<int:semester_id>/experiences/`
Method: GET
Description: Retrieve the list of experiences for the current user in a specific semester.
Parameters:
semester_id (integer): ID of the semester.
Token Header Required: Yes
**Request**
http GET http://localhost:8000/api/v1/student/semester/1/experiences/ "Authorization: Token <your_token_here>"
**Response**
[
    {
        "id": 1,
        "student": "user_id_here",
        "experience": "Details for the experience",
        "semester_photo1": "/media/anual_semester_photo/photo1.jpg",
        "semester_photo2": "/media/anual_semester_photo/photo2.jpg",
        "semester": 1
    },
   
]

## 10. Almanac - All Graduation Year Students
Endpoint: /almanac/all_graduation_year_student/
Method: GET
Description: Retrieve almanac for all graduation year students.
**Note result will be based on logged in user/Requesting user. i.e base on graduation year of the requesting user.**
**Note(hint): in the response there is the user_id which can be used to get all experiences for particular student**

Token Header Required: Yes
**Request**
http GET http://localhost:8000/api/v1/student/almanac/all_graduation_year_student/ "Authorization: Token <your_token_here>"
**Response**
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "reg_number": "12345",
        "current_level": "500",
        "course": "Computer Science",
        "faculty": "Engineering",
        "department": "Computer Science",
        "session": "2022/2023",
        "user_id": "user_id_here"
    },
    {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "reg_number": "54321",
        "current_level": "500",
        "course": "Electrical Engineering",
        "faculty": "Engineering",
        "department": "Electrical Engineering",
        "session": "2022/2023",
        "user_id": "another_user_id"
    }
]

## 11. Almanac - Faculty Graduation Student
`Endpoint: api/v1/student/almanac/faculty_graduation_student/`
Method: GET
Description: Retrieve almanac for faculty graduation students.
**Note result will be based on logged in user/Requesting user. i.e base on graduation year of the requesting user.**
**Note(hint): in the response there is the user_id which can be used to get all experiences for particular student**
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/almanac/faculty_graduation_student/ "Authorization: Token <your_token_here>"
**Response**
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "reg_number": "12345",
        "current_level": "500",
        "course": "Computer Science",
        "faculty": "Engineering",
        "department": "Computer Science",
        "session": "2022/2023",
        "user_id": "user_id_here"
    },
    {
        "id": 3,
        "first_name": "Alice",
        "last_name": "Smith",
        "email": "alice.smith@example.com",
        "reg_number": "98765",
        "current_level": "500",
        "course": "Mechanical Engineering",
        "faculty": "Engineering",
        "department": "Mechanical Engineering",
        "session": "2022/2023",
        "user_id": "another_user_id"
    }
]

## 12. Almanac - Course Graduation Student
`Endpoint: api/v1/student/almanac/course_graduation_student/`
Method: GET
Description: Retrieve almanac for course graduation students.
**Note result will be based on logged in user/Requesting user. i.e base on graduation year of the requesting user.**
**Note(hint): in the response there is the user_id which can be used to get all experiences for particular student**
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/almanac/course_graduation_student/ "Authorization: Token <your_token_here>"
**Response**
[
    {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "reg_number": "54321",
        "current_level": "500",
        "course": "Electrical Engineering",
        "faculty": "Engineering",
        "department": "Electrical Engineering",
        "session": "2022/2023",
        "user_id": "another_user_id"
    },
    {
        "id": 4,
        "first_name": "Bob",
        "last_name": "Johnson",
        "email": "bob.johnson@example.com",
        "reg_number": "87654",
        "current_level": "500",
        "course": "Computer Science",
        "faculty": "Engineering",
        "department": "Computer Science",
        "session": "2022/2023",
        "user_id": "yet_another_user_id"
    }
]


## 13. Almanac - Department Graduation Student
`Endpoint: api/v1/student/almanac/department_graduation_student/`
Method: GET
Description: Retrieve almanac for department graduation students.
**Note result will be based on logged in user/Requesting user. i.e base on graduation year of the requesting user.**
**Note(hint): in the response there is the user_id which can be used to get all experiences for particular student**
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/almanac/department_graduation_student/ "Authorization: Token <your_token_here>"

**Response**
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "reg_number": "12345",
        "current_level": "500",
        "course": "Computer Science",
        "faculty": "Engineering",
        "department": "Computer Science",
        "session": "2022/2023",
        "user_id": "user_id_here"
    },
    {
        "id": 3,
        "first_name": "Alice",
        "last_name": "Smith",
        "email": "alice.smith@example.com",
        "reg_number": "98765",
        "current_level": "500",
        "course": "Mechanical Engineering",
        "faculty": "Engineering",
        "department": "Mechanical Engineering",
        "session": "2022/2023",
        "user_id": "another_user_id"
    }
]


## 14. Faculty List
`Endpoint: api/v1/student/faculties/`
Method: GET
Description: Retrieve a list of faculties.
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/faculties/ "Authorization: Token your_token_here"
**Response**
[
    {
        "id": 1,
        "name": "Engineering"
    },
    {
        "id": 2,
        "name": "Science"
    }
]

## 15. Department List
`Endpoint: api/v1/student/departments/`
Method: GET
Description: Retrieve a list of departments.
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/departments/ "Authorization: Token your_token_here"
**Response**
[
    {
        "id": 1,
        "name": "Computer Science",
        "faculty": 1
    },
    {
        "id": 2,
        "name": "Mechanical Engineering",
        "faculty": 1
    }
]

## 16. Course List
`Endpoint: api/v1/student/courses/`
Method: GET
Description: Retrieve a list of courses.
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/courses/ "Authorization: Token your_token_here"

**Response**
[
    {
        "id": 1,
        "name": "Computer Science",
        "department": 1
    },
    {
        "id": 2,
        "name": "Software Engineering",
        "department": 1
    }
]

## 17. All Students
`Endpoint: api/v1/student/all/`
Method: GET
Description: Retrieve a list of all students.
Token Header Required: Yes
**Request**
http GET http://localhost:8000/api/v1/student/all/ "Authorization: Token your_token_here"

**Response**
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "reg_number": "12345",
        "current_level": "500",
        "course": "Computer Science",
        "faculty": "Engineering",
        "department": "Computer Science",
        "session": "2022/2023",
        "user_id": "user_id_here"
    },
    {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "reg_number": "54321",
        "current_level": "500",
        "course": "Electrical Engineering",
        "faculty": "Engineering",
        "department": "Electrical Engineering",
        "session": "2022/2023",
        "user_id": "another_user_id"
    }
]

## 18. Faculty Students
`Endpoint: api/v1/student/faculty/<int:faculty_id>/`
Method: GET
Description: Retrieve a list of students for a specific faculty.
Parameters:
faculty_id (integer): ID of the faculty.
Token Header Required: Yes
**Request**
http GET http://localhost:8000/api/v1/student/faculty/1/ "Authorization: Token your_token_here"
**Response**
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "reg_number": "12345",
        "current_level": "500",
        "course": "Computer Science",
        "faculty": "Engineering",
        "department": "Computer Science",
        "session": "2022/2023",
        "user_id": "user_id_here"
    },
    {
        "id": 3,
        "first_name": "Alice",
        "last_name": "Smith",
        "email": "alice.smith@example.com",
        "reg_number": "98765",
        "current_level": "500",
        "course": "Mechanical Engineering",
        "faculty": "Engineering",
        "department": "Mechanical Engineering",
        "session": "2022/2023",
        "user_id": "another_user_id"
    }
]

## 19. Department Students
Endpoint: api/v1/student/department/<int:department_id>/
Method: GET
Description: Retrieve a list of students for a specific department.
Parameters:
department_id (integer): ID of the department.
Token Header Required: Yes
**Request**
http GET http://localhost:8000/api/v1/student/department/1/ "Authorization: Token your_token_here"
**Response**
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "reg_number": "12345",
        "current_level": "500",
        "course": "Computer Science",
        "faculty": "Engineering",
        "department": "Computer Science",
        "session": "2022/2023",
        "user_id": "user_id_here"
    },
    {
        "id": 3,
        "first_name": "Alice",
        "last_name": "Smith",
        "email": "alice.smith@example.com",
        "reg_number": "98765",
        "current_level": "500",
        "course": "Mechanical Engineering",*
        "faculty": "Engineering",
        "department": "Mechanical Engineering",
        "session": "2022/2023",
        "user_id": "another_user_id"
    }
]

## 20. Course Students
Endpoint: api/v1/student/course/<int:course_id>/
Method: GET
Description: Retrieve a list of students for a specific course.
Parameters:
course_id (integer): ID of the course.
Token Header Required: Yes

**Request**
http GET http://localhost:8000/api/v1/student/course/1/ "Authorization: Token your_token_here"
**Response**
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "reg_number": "12345",
        "current_level": "500",
        "course": "Computer Science",
       

## 21. Level Students
Endpoint: /level/<int:course_id>/<str:level>/
Method: GET
Description: Retrieve a list of students for a specific course and level.
Parameters:
course_id (integer): ID of the course.
level (string): Level of the students.
Token Header Required: Yes