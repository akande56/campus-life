# sample HTTpie commands

- **add new experience:** http --form POST http://localhost:8003/api/v1/student/semester/<semester_id>/experiences/ "Authorization: Token <sample_token>"  student=2 experience="Details for the experience" semester_photo1@~/Pictures/abdul2.jpg semester_photo2@~/Pictures/abdul2.jpg semester=1

- **Get student experiences** http GET http://localhost:8004/api/v1/student/<student_id>/experiences/

**To get semester or session student experiences**; 
http GET http://localhost:8004/api/v1/student/session or semester/<student_id>/experiences/ "Authorization:Token <sample_token>"


- **login :**  http http://127.0.0.1:8004/api-token-auth/ username='<emai>' password='<password>'

- **Session list:**  http http://127.0.0.1:8004/api/v1/student/session_list/ "Authorization:Token <sample_token>"

- **Semester list** http http://127.0.0.1:8004/api/v1/student/semester_list/1/ "Authorization:Token <sample_token>"

- **Update student**  http PUT http://localhost:8004/api/v1/student/update/<student_id>/ "Authorization: Token  <sample_token>" current_level='200L'