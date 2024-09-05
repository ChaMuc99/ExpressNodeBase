const TeacherRepository = require("../repositories/TeacherRepository");
const appConfig = require('../configs/config');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../configs/config');

const TeachersService = {

   
    async authenticateTeacher(email, password) {
        const teacher = await TeacherRepository.getTeacherByEmail(email);
        if (!teacher) throw new Error('Authentication failed. Teacher not found.');

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) throw new Error('Authentication failed. Wrong password.');

        const token = jwt.sign({ teacher_id: teacher.teacher_id, email: teacher.email }, JWT_SECRET, { expiresIn: '1h' });

        return { token };
    },
    


    async createTeacher(data) {
        return await TeacherRepository.create(data);
    },
    async deleteTeacher(teacher_id) {
        return await TeacherRepository.delete(teacher_id);
    },
    async updateTeacher(teacher_id, data) {
        return await TeacherRepository.update(teacher_id, data);
    },
    async searchTeacher(teacher_id) {
        return await TeacherRepository.search(teacher_id);
    },
    async getAllTeachers() {
        return await TeacherRepository.getAll();
    },
    async login(payload) {
        const token = jwt.sign(payload, appConfig.SECRET_KEY, { expiresIn: `1d` });
        return token;
    },
};

module.exports = TeachersService;
