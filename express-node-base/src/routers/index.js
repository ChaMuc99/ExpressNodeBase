const express = require('express');
const routers = express.Router();
const StudentController = require('../controllers/StudentController');
const CourseController = require('../controllers/CourseController');
const GradeController = require('../controllers/GradeController');
const TeacherController = require('../controllers/TeacherController');
const CourseRegistrationController = require('../controllers/CourseRegistrationController');
const authenticate = require('../middleware/Authentication');
const AuthController = require('../controllers/AuthController');
const { roleAuthorization, isAdmin, isTeacherOrAdmin } = require('../utils/Authorization');

// Test route
routers.get('/test', (req, res) => {
    res.json({ message: 'Hello World !!!' });
});

// Login
routers.post('/login', AuthController.login);

// Student routes
routers.post('/student', authenticate, roleAuthorization(['teacher']), StudentController.createStudent);
routers.put('/student/:id', authenticate, roleAuthorization(['teacher']), StudentController.updateStudent);
routers.delete('/student/:id', authenticate, roleAuthorization(['teacher']), StudentController.deleteStudent);
routers.get('/student/:id', authenticate, roleAuthorization(['teacher']), StudentController.getStudent);
routers.get('/students', authenticate, roleAuthorization(['teacher']), StudentController.getAllStudents);

// Course routes
routers.post('/course', authenticate, roleAuthorization(['teacher']), CourseController.createCourse);
routers.put('/course/:id', authenticate, roleAuthorization(['teacher']), CourseController.updateCourse);
routers.delete('/course/:id', authenticate, roleAuthorization(['teacher']), CourseController.deleteCourse);
routers.get('/course/:id', authenticate, roleAuthorization(['teacher']), CourseController.getCourseById);
routers.get('/courses', authenticate, roleAuthorization(['teacher']), CourseController.getAllCourses);

// Teacher routes
routers.post('/teacher', authenticate, isAdmin, TeacherController.createTeacher);
routers.put('/teacher/:id', authenticate, isAdmin, TeacherController.updateTeacher);
routers.delete('/teacher/:id', authenticate, isAdmin, TeacherController.deleteTeacher);
routers.get('/teacher/:id', authenticate, isAdmin, TeacherController.getTeacher);
routers.get('/teachers', authenticate, isAdmin, TeacherController.getAllTeachers);

// Grade routes
routers.post('/grade', authenticate, roleAuthorization(['teacher']), GradeController.createGrade);
routers.put('/grade/:id', authenticate, roleAuthorization(['teacher']), GradeController.updateGrade);
routers.delete('/grade/:id', authenticate, roleAuthorization(['teacher']), GradeController.deleteGrade);
routers.get('/grade/:id', authenticate, roleAuthorization(['teacher']), GradeController.getGradeById);
routers.get('/grades', authenticate, roleAuthorization(['teacher']), GradeController.getAllGrades);
routers.get('/grades/semester/:semester', GradeController.getGradesBySemester);

// Course Registration routes
routers.post('/course-registration', CourseRegistrationController.registerCourse);
routers.delete('/course-registration/:registration_id', CourseRegistrationController.cancelCourseRegistration);
routers.get('/available-courses/:student_id', CourseRegistrationController.getAvailableCourses);
routers.get('/registered-courses/:student_id',CourseRegistrationController.viewRegisteredCourses);

module.exports = routers;
