const StudentsService = require('../services/StudentsService');

const StudentsController = {
    async createStudent(req,res,next){

        try {
            const studentData = req.body;
            const user = req.user;

            const student = await StudentsService.createStudent(studentData,user);
            res.status(201).json({ data: student, status: 'success'});
        
        }   catch (err){
            res.status(400).json({ error: err.message, status: 'error'});
        }
    },

    async deleteStudent(req, res, next) {
        try{
            const {id} = req.params;
            const user = req.user;

            await StudentsService.deleteStudent(id, user);
            res.status(200).json({ status: 'success'});

        }   catch (err) {
            res.status(400).json({ error: err.message, status: 'error'});
        }
    },

    async updateStudent(req, res, next) {
        try {
            const { id } = req.params;
            const studentData = req.body;
            const user = req.user;
            
            const student = await StudentsService.createStudent(id, studentData, user);
            res.status(201).json({data: student, status: 'success' });
            
        }   catch (err) {
            res.status(400).json({ error: err.message, status: 'error'});
        }
    },

    async searchStudents(req, res, next) {
        try {
            const criteria = req.query;
            const students = await StudentsService.searchStudent(criteria);

            res.status(200).json({ data: students, status: 'success'});

        }   catch (err){
            res.status(400).json({error: err.message, status: 'error'});
        }
    },

    async getAllStudents(req, res, next) {
        try {
            const students = await StudentsService.getAllStudents();
            res.status(200).json({ data: students, status: 'success'});
        }   catch (err){
            res.status(400).json({ error: err.message, status 'error'});
        }
    }
   
};

module.exports = StudentsController;