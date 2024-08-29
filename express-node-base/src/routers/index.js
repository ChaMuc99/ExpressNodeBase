const express = require('express');
const router = express.Router();
const StudentsController = require('../controllers/StudentsController');
const authenticate = require('../middleware/Authentication');
const roleAuthorization = require('../middleware/RoleAuthorization');

// Only teachers and admins can create, delete, update, and access students
router.post('/student', authenticate, roleAuthorization(['teacher', 'admin']), StudentsController.createStudent);
router.delete('/student/:id', authenticate, roleAuthorization(['teacher', 'admin']), StudentsController.deleteStudent);
router.put('/student/:id', authenticate, roleAuthorization(['teacher', 'admin']), StudentsController.updateStudent);
router.get('/student', authenticate, roleAuthorization(['teacher', 'admin']), StudentsController.searchStudents);
router.get('/students', authenticate, roleAuthorization(['teacher', 'admin']), StudentsController.getAllStudents);

module.exports = router;
