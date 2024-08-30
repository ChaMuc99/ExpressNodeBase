const CourseRegistrationService = require('../services/CourseRegistrationService');
const { isValidCourseRegistration } = require('../utils/Validate');

const CourseRegistrationController = {
    async registerCourse(req, res, next) {
        try {
            const { value: data, error } = isValidCourseRegistration(req.body);
            if (error) {
                return res.status(400).json({ error: error.message });
            }

            const result = await CourseRegistrationService.registerCourse(req.user, data);
            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }

            res.json({
                data: result.data,
                status: 'success',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    },

    async cancelRegistration(req, res, next) {
        try {
            const result = await CourseRegistrationService.cancelRegistration(req.user, req.body.course_id);
            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }

            res.json({
                data: result.data,
                status: 'success',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    },

    async getAvailableCourses(req, res, next) {
        try {
            const result = await CourseRegistrationService.getAvailableCourses(req.user, req.body.student_id);
            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }

            res.json({
                data: result.data,
                status: 'success',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    },

    async viewRegisteredCourses(req, res, next) {
        try {
            const result = await CourseRegistrationService.viewRegisteredCourses(req.user, req.body.student_id);
            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }

            res.json({
                data: result.data,
                status: 'success',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = CourseRegistrationController;
