const StudentsService = require('../services/StudentsService');
const { isValidStudent } = require('../utils/Validate');

const StudentController = {
    async createStudent(req, res, next) {
        try {
            const { value: data, error } = isValidStudent(req.body);
            if (error) {
                return res.status(400).send({ error: error.message || error });
            }

            // Check if the user is a teacher or admin
            if (!req.user || !['teacher', 'admin'].includes(req.user.role)) {
                return res.status(403).send({ error: 'Forbidden: You do not have permission to create a student.' });
            }

            const student = await StudentsService.createStudent(data);
            return res.status(201).json({
                data: student,
                status: 'success',
                statusCode: 201,
            });
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async deleteStudent(req, res, next) {
        try {
            const student_id = req.params.id;
            // Check if the user is a teacher or admin
            if (!req.user || !['teacher', 'admin'].includes(req.user.role)) {
                return res.status(403).send({ error: 'Forbidden: You do not have permission to delete a student.' });
            }
            await StudentsService.deleteStudent(student_id);
            return res.status(204).send(); // No Content
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async updateStudent(req, res, next) {
        try {
            const student_id = req.params.id;
            const { value: data, error } = isValidStudent(req.body);
            if (error) {
                return res.status(400).send({ error: error.message || error });
            }
            // Check if the user is a teacher or admin
            if (!req.user || !['teacher', 'admin'].includes(req.user.role)) {
                return res.status(403).send({ error: 'Forbidden: You do not have permission to update a student.' });
            }
            await StudentsService.updateStudent(student_id, data);
            return res.status(200).json({
                data: await StudentsService.searchStudent(student_id),
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async getStudent(req, res, next) {
        try {
            const student_id = req.params.id;
            const student = await StudentsService.searchStudent(student_id);
            if (!student) {
                return res.status(404).send({ error: 'Student not found' });
            }
            return res.status(200).json({
                data: student,
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async getAllStudents(req, res, next) {
        try {
            const students = await StudentsService.getAllStudents();
            return res.status(200).json({
                data: students,
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },
};

module.exports = StudentController;
