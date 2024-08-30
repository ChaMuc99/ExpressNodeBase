const TeachersRepository = require("../repositories/TeacherRepository");
const appConfig = require('../configs/config');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');

const TeachersService = {

   
        async loginTeacher(email, password) {
            // Find the teacher by email
            const teacher = await Teacher.findOne({ where: { email } });
            if (!teacher) throw new Error('Teacher not found');
    
            // Verify the password
            const isMatch = await bcrypt.compare(password, teacher.password); // Assuming you store hashed passwords
            if (!isMatch) throw new Error('Invalid password');
    
            // Generate a JWT token
            const token = jwt.sign({ id: teacher.id, email: teacher.email }, jwtSecret, { expiresIn: '1h' });
            return token;
        },
        async authenticateTeacher(email, password) {
            const teacher = await Teacher.findOne({ where: { email } });
    
            if (!teacher) return null;
    
            const isMatch = await bcrypt.compare(password, teacher.password);
    
            return isMatch ? teacher : null;
        },
    


    async createTeacher(data) {
        return await TeachersRepository.create(data);
    },
    async deleteTeacher(teacher_id) {
        return await TeachersRepository.delete(teacher_id);
    },
    async updateTeacher(teacher_id, data) {
        return await TeachersRepository.update(teacher_id, data);
    },
    async searchTeacher(teacher_id) {
        return await TeachersRepository.search(teacher_id);
    },
    async getAllTeachers() {
        return await TeachersRepository.getAll();
    },
    async login(payload) {
        const token = jwt.sign(payload, appConfig.SECRET_KEY, { expiresIn: `1d` });
        return token;
    },
};

module.exports = TeachersService;
