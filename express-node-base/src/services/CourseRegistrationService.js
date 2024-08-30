const CourseRegistrationRepository = require('../repositories/CourseRegistrationRepository');
const CourseRepository = require('../repositories/CourseRepository');
const _ = require('lodash');

const CourseRegistrationService = {
    async registerCourse(user, data) {
        if (user.role !== 'student' || user.student_id !== data.student_id) {
            return { success: false, message: 'Unauthorized' };
        }

        const courseExists = await CourseRepository.getCourseById(data.course_id);
        if (!courseExists) {
            return { success: false, message: 'Course not found' };
        }

        const alreadyRegistered = await CourseRegistrationRepository.isAlreadyRegistered(data.student_id, data.course_id);
        if (alreadyRegistered) {
            return { success: false, message: 'Already registered for this course' };
        }

        const registration = await CourseRegistrationRepository.create(data);
        return { success: true, data: registration };
    },

    async cancelRegistration(user, courseId) {
        if (user.role !== 'student') {
            return { success: false, message: 'Unauthorized' };
        }

        const registration = await CourseRegistrationRepository.getRegistrationByStudentAndCourse(user.student_id, courseId);
        if (!registration) {
            return { success: false, message: 'Registration not found' };
        }

        await CourseRegistrationRepository.deleteRegistration(registration.registration_id);
        return { success: true, message: 'Registration canceled' };
    },

    async getAvailableCourses(user, studentId) {
        if (user.role !== 'student' || user.student_id !== studentId) {
            return { success: false, message: 'Unauthorized' };
        }

        const availableCourses = await CourseRepository.getAvailableCourses(studentId);
        return { success: true, data: availableCourses };
    },

    async viewRegisteredCourses(user, studentId) {
        if (user.role !== 'student' || user.student_id !== studentId) {
            return { success: false, message: 'Unauthorized' };
        }

        const registeredCourses = await CourseRegistrationRepository.getRegisteredCourses(studentId);
        return { success: true, data: registeredCourses };
    },
};

module.exports = CourseRegistrationService;
