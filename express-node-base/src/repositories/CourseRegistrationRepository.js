const  Op  = require('sequelize');
const CourseRegistrationModel = require('../models/CourseRegistration'); 
const CourseModel = require('../models/Course'); 

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

    static async getAvailableCourses(studentId) {
        if (!studentId) {
            throw new Error('Student ID is required');
        }
    
        // Get all registered course IDs for the student
        const registeredCourses = await this.getRegisteredCourses(studentId);
        const registeredCourseIds = registeredCourses.map(reg => reg.course_id);
    
        // Find all courses that are not in the registeredCourseIds
        return CourseModel.findAll({
            where: {
                id: {
                    [Op.not]: registeredCourseIds // Exclude registered courses
                }
            }
        });
    }
}

module.exports = CourseRegistrationRepository;
