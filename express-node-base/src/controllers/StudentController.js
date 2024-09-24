const StudentsService = require('../services/StudentService');
const { isValidStudent } = require('../utils/Validate');
const { isTeacherOrAdmin } = require('../utils/Authorization');

const StudentController = {
    async createStudent(req, res) {
        try {
            const user = req.user;
    
            // Check if the user is defined and has a role
            if (!user || !user.role) {
                return res.status(401).json({
                    error: "Unauthorized: User data not found.",
                    status: 'error',
                    statusCode: 401,
                });
            }
    
            // Authorization check to ensure only teachers or admins can create students
            if (!['teacher', 'admin'].includes(user.role)) {
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
            console.error('Error creating student:', err); // Log the error for debugging
            res.status(500).json({
                error: err.message || 'An error occurred while creating the student.',
                status: 'error',
                statusCode: 500,
            });
        }
    },
    async deleteStudent(req, res) {
        try {
            const student_id = req.params.id;
            const user = req.user;  // Assuming req.user is populated from the authentication middleware
    
            // Check if user is defined and has a role
            if (!user || !user.role) {
                return res.status(401).json({
                    error: "Unauthorized: User data not found.",
                    status: 'error',
                    statusCode: 401,
                });
            }
    
            // Authorization check to ensure only teachers or admins can delete students
            if (!['teacher', 'admin'].includes(user.role)) {
                return res.status(403).json({
                    error: 'Forbidden: You do not have permission to delete a student.',
                    status: 'error',
                    statusCode: 403,
                });
            }
    
            // Call the service to delete the student
            await StudentsService.deleteStudent(student_id);
    
            // Successful deletion response
            return res.status(200).json({
                message: 'Student deleted successfully.',
                status: 'success',
                statusCode: 200,
            });
        } catch (err) {
            console.error('Error deleting student:', err); // Log the error for debugging
            res.status(500).json({
                error: err.message || 'An error occurred while deleting the student.',
                status: 'error',
                statusCode: 500,
            });
        }
    }
    ,
    async updateStudent(req, res, next) {
        try {
            // Validate student data
            const { value: data, error } = isValidStudent(req.body);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
    
            // Update student information
            const student = await StudentsService.updateStudent(req.params.id, data);
            
        
            return res.status(200).json({ student, status: 'success' });
        } catch (err) {
            next(err);
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
            console.log('Retrieved students:', students);

            if (!res.headersSent) {
                return res.status(200).json(students);
            }
        } catch (error) {
            console.error('Error fetching students:', error);

            if (!res.headersSent) {
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
};

module.exports = StudentController;
