const express = require('express');
const router = express.Router();

// Import controllers
const StudentController = require('../controllers/StudentController');
const ClassController = require('../controllers/ClassController');
const CourseController = require('../controllers/CourseController');
const CourseRegistrationController = require('../controllers/CourseRegistrationController');

// Import middleware
const authenticate = require('../middleware/Authentication');

// Public routes
router.get('/test', (req, res) => {
    res.json({ message: 'Hello World !!!' });
});

// Authentication routes
router.post('/login', StudentController.loginStudent);

// Student routes
router.post('/student', authenticate, StudentController.createStudent);
router.put('/student/:id', authenticate, StudentController.updateStudent);
router.delete('/student/:id', authenticate, StudentController.deleteStudent);
router.get('/students', authenticate, StudentController.getAllStudents);
router.get('/student/:id', authenticate, StudentController.getStudentById);

// Class routes
router.post('/class', authenticate, ClassController.createClass);
router.get('/class', authenticate, ClassController.getClasses);
router.get('/class/raw', authenticate, ClassController.getClassesRaw);

// Course routes
router.post('/course', authenticate, CourseController.createCourse);
router.get('/course/:id', authenticate, CourseController.getCourseById);
router.get('/courses', authenticate, CourseController.getAllCourses);
router.put('/course/:id', authenticate, CourseController.updateCourse);
router.delete('/course/:id', authenticate, CourseController.deleteCourse);

// Course registration routes
router.post('/register-course', authenticate, CourseRegistrationController.registerCourse);
router.post('/cancel-registration', authenticate, CourseRegistrationController.cancelRegistration);
router.get('/available-courses', authenticate, CourseRegistrationController.getAvailableCourses);
router.get('/registered-courses', authenticate, CourseRegistrationController.viewRegisteredCourses);

module.exports = router;
