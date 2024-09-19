const StudentsService = require('../services/StudentService');
const { isValidStudent } = require('../utils/Validate');
const { isTeacherOrAdmin } = require('../utils/Authorization');

const StudentController = {
    async createStudent(req, res) {
        try {
            const user = req.user;  // Assuming req.user is populated from the authentication middleware

            // Authorization check to ensure only teachers or admins can create students
            if (!isTeacherOrAdmin(user)) {
                return res.status(403).json({
                    error: "Forbidden: You do not have permission to create a student.",
                    status: 'error',
                    statusCode: 403,
                });
            }

            // Validate student data
            const { value: data, error } = isValidStudent(req.body);
            if (error) {
                return res.status(400).json({ error: error.message || error });
            }

            // Create student
            const student = await StudentsService.createStudent(data);
            return res.status(201).json({
                data: student,
                status: 'success',
                statusCode: 201,
            });
        } catch (err) {
            res.status(400).json({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async deleteStudent(req, res) {
        try {
            const student_id = req.params.id;
            const user = req.user;  // Assuming req.user is populated from the authentication middleware

            // Authorization check to ensure only teachers or admins can delete students
            if (!isTeacherOrAdmin(user)) {
                return res.status(403).json({
                    error: 'Forbidden: You do not have permission to delete a student.',
                    status: 'error',
                    statusCode: 403,
                });
            }

            await StudentsService.deleteStudent(student_id);
            return res.status(204).send(); // No Content
        } catch (err) {
            res.status(400).json({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async updateStudent(req, res) {
        try {
            const student_id = req.params.id;
            const { value: data, error } = isValidStudent(req.body);
            if (error) {
                return res.status(400).json({ error: error.message || error });
            }
            const user = req.user;  // Assuming req.user is populated from the authentication middleware

            // Authorization check to ensure only teachers or admins can update students
            if (!isTeacherOrAdmin(user)) {
                return res.status(403).json({
                    error: 'Forbidden: You do not have permission to update a student.',
                    status: 'error',
                    statusCode: 403,
                });
            }

            await StudentsService.updateStudent(student_id, data);
            return res.status(200).json({
                data: await StudentsService.searchStudent(student_id),
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            res.status(400).json({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async getStudent(req, res) {
        try {
            const student_id = req.params.id;
            const student = await StudentsService.searchStudent(student_id);
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            return res.status(200).json({
                data: student,
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            res.status(400).json({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async getAllStudents(req, res) {
        try {
            const students = await StudentsService.getAllStudents();
            return res.status(200).json({
                data: students,
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            res.status(400).json({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },
};

module.exports = StudentController;
