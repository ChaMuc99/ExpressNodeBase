const CourseRegistrationModel = require('../models/CourseRegistration');

class CourseRegistrationRepository {
    static create(data) {
        return CourseRegistrationModel.create(data);
    }

    static getRegistrationByStudentAndCourse(studentId, courseId) {
        return CourseRegistrationModel.findOne({ where: { student_id: studentId, course_id: courseId } });
    }

    static deleteRegistration(registrationId) {
        return CourseRegistrationModel.destroy({ where: { registration_id: registrationId } });
    }

    static isAlreadyRegistered(studentId, courseId) {
        return CourseRegistrationModel.findOne({ where: { student_id: studentId, course_id: courseId } });
    }

    static getRegisteredCourses(studentId) {
        return CourseRegistrationModel.findAll({ where: { student_id: studentId } });
    }
}

module.exports = CourseRegistrationRepository;
