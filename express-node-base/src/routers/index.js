const express = require('express');
const routers = express.Router();
const StudentController = require('../controllers/StudentController');
const CourseController = require('../controllers/CourseController');
const GradeController = require('../controllers/GradeController');
const TeacherController = require('../controllers/TeacherController');
const CourseRegistrationController = require('../controllers/CourseRegistrationController');
const authenticate = require('../middleware/Authentication');

// Test route
routers.get('/test', (req, res) => {
    res.json({ message: 'Hello World !!!' });
});

// Student routes
routers.post('/login', StudentController.loginStudent);

routers.post('/student', authenticate, StudentController.createStudent);
routers.put('/student/:id', authenticate, StudentController.updateStudent);
routers.delete('/student/:id', authenticate, StudentController.deleteStudent);
routers.get('/student/:id', authenticate, StudentController.getStudent);
routers.get('/students', authenticate, StudentController.getAllStudents);

// Course routes
routers.post('/course', authenticate, CourseController.createCourse);
routers.put('/course/:id', authenticate, CourseController.updateCourse);
routers.delete('/course/:id', authenticate, CourseController.deleteCourse);
routers.get('/course/:id', authenticate, CourseController.getCourseById);
routers.get('/courses', authenticate, CourseController.getAllCourses);

// Teacher routes
routers.post('/login/teacher', TeacherController.loginTeacher); 

routers.post('/teacher',TeacherController.createTeacher);
routers.put('/teacher/:id', TeacherController.updateTeacher);
routers.delete('/teacher/:id',TeacherController.deleteTeacher);
routers.get('/teacher/:id',TeacherController.getTeacher);
routers.get('/teachers',TeacherController.getAllTeachers);

// Grade routes
routers.post('/grade', authenticate, GradeController.createGrade);
routers.put('/grade/:id', authenticate, GradeController.updateGrade);
routers.delete('/grade/:id', authenticate, GradeController.deleteGrade);
routers.get('/grade/:id', authenticate, GradeController.getGradeById);
routers.get('/grades', authenticate, GradeController.getAllGrades);
routers.get('/grades/semester/:semester', authenticate, GradeController.getGradesBySemester);

// Course Registration routes
routers.post('/course-registration', authenticate, CourseRegistrationController.registerCourse);
routers.delete('/course-registration/:registrationId', authenticate, CourseRegistrationController.cancelRegistration);
routers.get('/available-courses/:studentId', authenticate, CourseRegistrationController.getAvailableCourses);
routers.get('/registered-courses/:studentId', authenticate, CourseRegistrationController.viewRegisteredCourses);

module.exports = routers;