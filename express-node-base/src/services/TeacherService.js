const TeachersRepository = require("../repositories/TeachersRepository");
const appConfig = require('../configs/config');
const jwt = require('jsonwebtoken');

const TeachersService = {
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
