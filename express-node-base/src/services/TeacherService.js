const TeacherRepository = require("../repositories/TeacherRepository");
const appConfig = require('../configs/config');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const { JWT_SECRET } = require('../configs/config');

const TeacherService = {

    async findByEmail(email) {
        return await Teacher.findOne({ where: { email } });
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
        const token = jwt.sign(payload, appConfig.SECRET_KEY, { expiresIn: '1d' });
        return token;
    },
};

module.exports = TeacherService;
