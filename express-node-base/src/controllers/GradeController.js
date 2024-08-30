const GradeService = require('../services/GradeService');
const { isValidGrade } = require('../utils/Validate');

const GradeController = {
    async createGrade(req, res, next) {
        try {
            const { value: data, error } = isValidGrade(req.body);
            if (error) {
                return res.status(400).send(new Error(error.message || error));
            }
            return res.json({
                data: await GradeService.createGrade(data),
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

    async updateGrade(req, res, next) {
        try {
            const grade_id = req.params.grade_id;
            const { value: data, error } = isValidGrade(req.body);
            if (error) {
                return res.status(400).send(new Error(error.message || error));
            }
            return res.json({
                data: await GradeService.updateGrade(grade_id, data),
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

    async deleteGrade(req, res, next) {
        try {
            const grade_id = req.params.grade_id;
            await GradeService.deleteGrade(grade_id);
            return res.json({
                message: 'Grade deleted successfully',
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

    async getGradeById(req, res, next) {
        try {
            const grade_id = req.params.grade_id;
            const grade = await GradeService.getGradeById(grade_id);
            return res.json({
                data: grade,
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

    async getAllGrades(req, res, next) {
        try {
            const grades = await GradeService.getAllGrades();
            return res.json({
                data: grades,
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

    async getGradesBySemester(req, res, next) {
        try {
            const { student_id } = req.user;
            const { semester } = req.query;
            const grades = await GradeService.getGradesBySemester(student_id, semester);
            return res.json({
                data: grades,
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
    }
};

module.exports = GradeController;
