const StudentsRepository = require("../repositories/StudentsRepository");
const appConfig = require('../configs/config');
const jwt = require('jsonwebtoken');

const StudentsService = {
    async createStudent(data) {
        return await StudentsRepository.create(data);
    },
    async deleteStudent(student_id) {
        return await StudentsRepository.delete(student_id);
    },
    async updateStudent(student_id, data) {
        return await StudentsRepository.update(student_id, data);
    },
    async searchStudent(student_id) {
        return await StudentsRepository.search(student_id);
    },
    async getAllStudents() {
        return await StudentsRepository.getAll();
    },
    async login(payload) {
        const token = jwt.sign(payload, appConfig.SECRET_KEY, { expiresIn: `1d` });
        return token;
    },
};

module.exports = StudentsService;
