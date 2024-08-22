const express = require('express');
const routers = express.Router();
const classesController = require('../controllers/classesController');
const StudentsController = require('../controllers/studentsController');
const authenticate = require('../middleware/Authentication')


routers.get('/test', function (req, res) {
    res.json({message: 'Hello World !!!'});
});

// Tag
routers.post('/login', StudentsController.loginStudent)
routers.post('/student', authenticate, StudentsController.createStudent)
routers.post('/class', authenticate, classesController.createClass)
routers.get('/class', authenticate, classesController.getClasses)
routers.get('/class/raw', authenticate, classesController.getClassesRaw)

exports = module.exports = routers;
