const TeachersService = require('../services/TeachersService');
const { isValidTeacher } = require('../utils/Validate');

const TeacherController = {
    async createTeacher(req, res, next) {
        try {
            const { value: data, error } = isValidTeacher(req.body);
            if (error) {
                return res.status(400).send({ error: error.message || error });
            }

            // Check if the user is an admin
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).send({ error: 'Forbidden: Only admins can create a teacher.' });
            }

            const teacher = await TeachersService.createTeacher(data);
            return res.status(201).json({
                data: teacher,
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

    async deleteTeacher(req, res, next) {
        try {
            const teacher_id = req.params.id;
            // Check if the user is an admin
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).send({ error: 'Forbidden: Only admins can delete a teacher.' });
            }
            await TeachersService.deleteTeacher(teacher_id);
            return res.status(204).send(); // No Content
        } catch (err) {
            res.status(400).send({
                error: err.message || err,
                status: 'error',
                statusCode: 400,
            });
        }
    },

    async updateTeacher(req, res, next) {
        try {
            const teacher_id = req.params.id;
            const { value: data, error } = isValidTeacher(req.body);
            if (error) {
                return res.status(400).send({ error: error.message || error });
            }
            // Check if the user is an admin
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).send({ error: 'Forbidden: Only admins can update a teacher.' });
            }
            await TeachersService.updateTeacher(teacher_id, data);
            return res.status(200).json({
                data: await TeachersService.searchTeacher(teacher_id),
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

    async getTeacher(req, res, next) {
        try {
            const teacher_id = req.params.id;
            const teacher = await TeachersService.searchTeacher(teacher_id);
            if (!teacher) {
                return res.status(404).send({ error: 'Teacher not found' });
            }
            return res.status(200).json({
                data: teacher,
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

    async getAllTeachers(req, res, next) {
        try {
            const teachers = await TeachersService.getAllTeachers();
            return res.status(200).json({
                data: teachers,
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

module.exports = TeacherController;
