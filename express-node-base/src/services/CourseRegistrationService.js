const CourseRegistrationRepository = require('../repositories/CourseRegistrationRepository');
const Course = require('../models/Course');
const Student = require('../models/Student');
const CourseRegistration = require('../models/CourseRegistration');
const { v4: uuidv4 } = require('uuid');

const CourseRegistrationService = {
    async registerCourse(student_id, course_id) {
        try {
     
            const student = await Student.findOne({ where: { student_id } });
            if (!student) {
                return { success: false, message: 'Student not found' };
            }
    
      
            const course = await Course.findOne({ where: { course_id } });
            if (!course) {
                return { success: false, message: 'Course not found' };
            }
    
     
            const alreadyRegistered = await CourseRegistration.findOne({
                where: { student_id, course_id }
            });
            if (alreadyRegistered) {
                return { success: false, message: 'Student is already registered for this course' };
            }
    
            const registration = await CourseRegistration.create({
                registration_id: uuidv4(),
                student_id,
                course_id,
                registration_date: new Date(),
                created_by: 'system', 
                updated_by: 'system'
            });
    
            return {
                success: true,
                data: registration
            };
    
        } catch (error) {
            console.error('Error registering student for course:', error);
            return { success: false, message: 'An error occurred during registration' };
        }
    },

    async cancelCourseRegistrationService(registration_id) {
        try {
            // Check if the registration exists
            const registration = await CourseRegistration.findOne({ where: { registration_id } });
    
            if (!registration) {
                throw new Error('Registration not found');
            }
    
            // Delete the registration
            await registration.destroy();
    
            return {
                message: 'Course registration canceled successfully',
                status: 'success',
                statusCode: 200
            };
        } catch (err) {
            throw err; // Re-throw the error for the controller to handle
        }
    },

    async getAvailableCourses(studentId) {
        try {
            // Validate studentId
            if (!studentId) {
                return { success: false, message: 'Student ID is required' };
            }
    
          
            const availableCourses = await Course.findAll({
             
            });
    
            return {
                success: true,
                data: availableCourses
            };
        } catch (error) {
            console.error('Error fetching available courses:', error);
            return { success: false, message: 'An error occurred while fetching courses' };
        }
    },
    

    async viewRegisteredCourses(student_id) {
        try {
            const registeredCourses = await CourseRegistration.findAll({
                where: { student_id },
                include: [{
                    model: Course,
                    attributes: ['course_id', 'course_name', 'course_credits', 'course_schedule'] // Fields from the Course model
                }]
            });
    
            if (registeredCourses.length === 0) {
                return { success: false, message: 'No courses registered for this student' };
            }
    
            return {
                success: true,
                data: registeredCourses
            };
        } catch (error) {
            console.error('Error fetching registered courses:', error);
            return { success: false, message: 'An error occurred while fetching registered courses' };
        }
    }
};

module.exports = CourseRegistrationService;
