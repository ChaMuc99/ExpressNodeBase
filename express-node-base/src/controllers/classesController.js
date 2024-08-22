const classesService = require('../services/classesService')
const { isValidClass } = require('../utils/Validate');

const ClassesController = {
    async createClass(req, res, next) {
        try {
            const {value: data, error: error} = isValidClass(req.body);
            if (error) {
                return res.status(500).send(new Error(error.message || error));;
            }
            return res.json({
                data: await classesService.createClass(data),
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
    async getClasses(req, res, next) {
        try {
            return res.json({
                data: await classesService.getClasses(req.query),
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
    async getClassesRaw(req, res, next) {
        try {
            return res.json({
                data: await classesService.getClassesRaw(req.query),
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

module.exports = ClassesController;
